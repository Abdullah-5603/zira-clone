import { Box, Button, Card, Image } from "@chakra-ui/react"

export const CardHorizontal = ({project}) => {
    return (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image
      objectFit="cover"
      maxW="200px"
    //   src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
    src={project.demoImage}  
    alt={project.name}
    />
    <Box>
      <Card.Body>
        <Card.Title mb="2">{project.name}</Card.Title>
        <Card.Description>
          {project.description}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => {
            
        }}>Manage</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)

}
