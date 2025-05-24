import {
    Box, Button, Heading, Text, VStack, Icon,
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BiArrowFromRight } from 'react-icons/bi';
import TaskModal from '../../components/Modal/Modal';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTaskCard = ({ task, onClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Box
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            bg="gray.700"
            p={3}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
            onClick={onClick}
        >
            <Text fontWeight="semibold" textAlign="center">{task.title}</Text>
        </Box>
    );
};

const Projects = () => {
    const { id } = useParams();
    const [data, setData] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [task, setTask] = React.useState(false);

    const sensors = useSensors(useSensor(PointerSensor));

    React.useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch('data.json');
                if (!res.ok) throw new Error('Network response was not ok');
                const jsonData = await res.json();
                const project = jsonData.projects.find((proj) => proj.id === id);
                setData(project);
            } catch (error) {
                console.error('Fetching error:', error);
            }
        }
        fetchProject();
    }, [id]);

    if (!data) return <Box p={5}>Loading...</Box>;

    const groupedTasks = data.tasks.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
    }, {});

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const activeTask = data.tasks.find(t => t.id === active.id);
        if (!activeTask) return;

        const status = activeTask.status;
        const columnTasks = groupedTasks[status];

        const oldIndex = columnTasks.findIndex(t => t.id === active.id);
        const newIndex = columnTasks.findIndex(t => t.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const reorderedColumn = arrayMove(columnTasks, oldIndex, newIndex);

        const newGroupedTasks = {
            ...groupedTasks,
            [status]: reorderedColumn,
        };

        const newTasks = Object.values(newGroupedTasks).flat();

        setData(prev => ({ ...prev, tasks: newTasks }));
    };

    const statuses = Object.keys(groupedTasks);

    return (
        <Box p={5} display="flex" flexDirection="column" alignItems="start">
            <Box display="flex" justifyContent="space-between" alignItems="center" w="50%" mb={6}>
                <Button onClick={() => (window.location.href = '/')}>
                    <Icon><BiArrowFromRight /></Icon>
                    Back To Board
                </Button>
                <Heading size="lg" textAlign="center">{data.name}</Heading>
            </Box>

            <Box
                display="flex"
                overflowX="auto"
                gap={6}
                padding={5}
                borderRadius="md"
                boxShadow="md"
                css={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#CBD5E0 transparent',
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#A0AEC0', borderRadius: '24px' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
                }}
            >
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {statuses.map((status) => (
                        <Box
                            key={status}
                            bg="gray.800"
                            p={4}
                            borderRadius="md"
                            minWidth="300px"
                            maxWidth="300px"
                            boxShadow="md"
                            flexShrink={0}
                        >
                            <Heading size="md" mb={4} textAlign="center">{status}</Heading>

                            <SortableContext
                                items={groupedTasks[status].map((t) => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <VStack spacing={4} align="stretch">
                                    {groupedTasks[status].map((taskItem) => (
                                        <SortableTaskCard
                                            key={taskItem.id}
                                            task={taskItem}
                                            onClick={() => {
                                                setOpen(true);
                                                setTask(taskItem);
                                            }}
                                        />
                                    ))}
                                </VStack>
                            </SortableContext>
                        </Box>
                    ))}
                </DndContext>
            </Box>

            <TaskModal isOpen={open} onClose={() => setOpen(false)} task={task} />
        </Box>
    );
};

export default Projects;
