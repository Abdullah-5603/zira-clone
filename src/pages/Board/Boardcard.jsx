import { Box, Button, Card, Image } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const CardHorizontal = ({ project }) => {
    const navigate = useNavigate();
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
            <Image
                objectFit="cover"
                maxW="200px"
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
                        navigate(`/projects/${project.id}`)
                    }}>Manage</Button>
                </Card.Footer>
            </Box>
        </Card.Root>
    )

}
