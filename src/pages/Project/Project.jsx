import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const Projects = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

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

  // Group tasks by status
  const groupedTasks = data.tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});

  const statuses = Object.keys(groupedTasks);

  return (
    <Box p={4}>
      <Heading size="lg" mb={6} textAlign="center">
        {data.name}
      </Heading>

      <Box
        display="flex"
        overflowX="auto"
        gap={6}
        p={4}
        borderRadius="md"
        boxShadow="md"
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
                >
                  <Text fontWeight="semibold" textAlign={'center'}>{task.title}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
