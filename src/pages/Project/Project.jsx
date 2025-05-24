import { Box, Button, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import TaskModal from '../../components/Modal/Modal';
import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi';

const Projects = () => {
    const { id } = useParams();
    const [data, setData] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [task, setTask] = React.useState(false);

    React.useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch('/data.json');
                if (!res.ok) throw new Error('Network response was not ok');
                const jsonData = await res.json();

                const project = jsonData.projects.find(proj => proj.id === id);
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

    const statuses = Object.keys(groupedTasks);

    return (
        <Box
            p={5}
            display="flex"
            flexDirection="column"
            alignItems="start"
        >
            <Box 
            display={'flex'}
            justifyContent="space-between"
            alignItems="center"
            w="50%"
            mb={6}
            >
                <Button
                    onClick={() => window.location.href = '/'}
                >
                    <Icon>
                        <BiArrowFromRight />
                    </Icon>
                    Back Too Board
                </Button>
                <Heading size="lg" textAlign="center">
                    {data.name}
                </Heading>
            </Box>

            <Box
                display="flex"
                overflowX="auto"
                gap={6}
                padding={5}
            borderRadius="md"
            boxShadow="md"
            // minHeight="svh"
            css={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E0 transparent', // gray.300 & transparent
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#A0AEC0', borderRadius: '24px' },
              '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            }}
            >
                {statuses.map((status) => (
                    <Box
                        key={status}
                        bg="gray.800"
                        p={4}
                        borderRadius="md"
                        minWidth="300px"
                        maxWidth="300px"
                        // minHeight="fit-content"
                        boxShadow="md"
                        flexShrink={0}
                    >
                        <Heading size="md" mb={4} textAlign="center">
                            {status}
                        </Heading>

                        <VStack spacing={4} align="stretch">
                            {groupedTasks[status].map((task) => (
                                <Box
                                    key={task.id}
                                    bg="gray.700"
                                    p={3}
                                    borderRadius="md"
                                    boxShadow="sm"
                                    _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
                                    onClick={() => {
                                        setOpen(true)
                                        setTask(task)
                                    }}
                                >
                                    <Text fontWeight="semibold" textAlign={'center'}>{task.title}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </Box>

            <TaskModal isOpen={open} onClose={() => setOpen(false)} task={task} />
        </Box>
    );
};

export default Projects;
