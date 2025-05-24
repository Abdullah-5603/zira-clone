import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { sampleProject } from "../data/sampleData";
import "../styles/board.scss";

const Board = () => {
  const groupedTasks = {
    "To Do": [],
    "In Progress": [],
    "Done": []
  };

  sampleProject.tasks.forEach(task => {
    groupedTasks[task.status].push(task);
  });

  return (
    <Box className="board-container" p={5}>
      <Heading mb={6}>{sampleProject.name}</Heading>

      <Box className="columns">
        {["To Do", "In Progress", "Done"].map((status) => (
          <Box key={status} className="column">
            <Text className="column-title">{status}</Text>
            <VStack spacing={3}>
              {groupedTasks[status].map((task) => (
                <Box key={task.id} className="task-card" p={4}>
                  {task.title}
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Board;
