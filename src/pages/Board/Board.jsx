import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import "./styles.scss";
import { CardHorizontal } from "./Boardcard";

const Board = () => {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
            async function fetchProject() {
            try {
                const res = await fetch('data.json');
                if (!res.ok) throw new Error('Network response was not ok');
                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                console.error('Fetching error:', error);
            }
        }
        fetchProject();
  }, []);

    if (!data) return <Box p={5}>Loading...</Box>;

  const sampleProject = data.projects;

  return (
    <Box className="zira-page-content board-container" p={5}>
      <Heading className="zira-page-title" mb={6}>{data.name}</Heading>

      <Box className="board-container__columns">
        {sampleProject.map(project =>(
          <CardHorizontal project={project}/>
        ))}
      </Box>
    </Box>
  );
};

export default Board;
