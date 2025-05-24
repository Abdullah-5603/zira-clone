import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import "./styles.scss";
import { CardHorizontal } from "./Boardcard";

const Board = () => {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('public/data.json')
      .then(res => res.json())
      .then(setData);
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
