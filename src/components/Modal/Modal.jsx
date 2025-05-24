import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Link,
  CloseButton,
} from "@chakra-ui/react";

const statusColors = {
  "To Do": "gray",
  "In Progress": "yellow",
  "In Development": "blue",
  Done: "green",
};

export default function CustomModal({ isOpen, onClose, task }) {

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bg="rgba(0,0,0,0.7)"
        zIndex={1000}
        onClick={onClose}
      />

      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.800"
        width={["90vw", "600px"]}
        maxHeight="80vh"
        overflowY="auto"
        borderRadius="md"
        boxShadow="lg"
        zIndex={1001}
        p={6}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {task.title}
          </Text>
          <Badge colorScheme={statusColors[task.status] || "gray"} fontSize="md">
            {task.status}
          </Badge>
          <CloseButton onClick={onClose} />
        </Flex>

        <Box mb={4}>
          <Text fontWeight="semibold" mb={1}>
            Description
          </Text>
          <Text whiteSpace="pre-wrap">{task.description || "No description"}</Text>
        </Box>

        <Flex mb={4} wrap="wrap" gap={4}>
          <Box flex="1" minW="120px">
            <Text fontWeight="semibold" mb={1}>
              Assignee
            </Text>
            <Text>{task.assignee || "Unassigned"}</Text>
          </Box>
          <Box flex="1" minW="120px">
            <Text fontWeight="semibold" mb={1}>
              Priority
            </Text>
            <Text>{task.priority || "Normal"}</Text>
          </Box>
          <Box flex="1" minW="120px">
            <Text fontWeight="semibold" mb={1}>
              Due Date
            </Text>
            <Text>{task.dueDate || "No due date"}</Text>
          </Box>
        </Flex>

        <Box mb={4}>
          <Text fontWeight="semibold" mb={2}>
            Subtasks
          </Text>
          {task.subtasks && task.subtasks.length > 0 ? (
            task.subtasks.map((subtask) => (
              <Flex
                key={subtask.id}
                justify="space-between"
                bg="gray.700"
                p={2}
                borderRadius="md"
                mb={2}
              >
                <Text>{subtask.title}</Text>
                <Badge colorScheme={statusColors[subtask.status] || "gray"}>
                  {subtask.status}
                </Badge>
              </Flex>
            ))
          ) : (
            <Text>No subtasks</Text>
          )}
        </Box>

        <Box mb={4}>
          <Text fontWeight="semibold" mb={2}>
            Comments
          </Text>
          {task.comments && task.comments.length > 0 ? (
            task.comments.map((comment, i) => (
              <Box
                key={i}
                bg="gray.700"
                borderRadius="md"
                p={3}
                mb={3}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={1} color="gray.500">
                  {comment.author} — {new Date(comment.date).toLocaleDateString()}
                </Text>
                <Text>{comment.comment}</Text>
              </Box>
            ))
          ) : (
            <Text>No comments</Text>
          )}
        </Box>

        <Box>
          <Text fontWeight="semibold" mb={2}>
            Attachments
          </Text>
          {task.attachments && task.attachments.length > 0 ? (
            task.attachments.map((file, i) => (
              <Link
                key={i}
                href={file.url}
                isExternal
                display="block"
                mb={1}
                color="blue.500"
                _hover={{ textDecoration: "underline", color: "blue.600" }}
              >
                {file.filename}
              </Link>
            ))
          ) : (
            <Text>No attachments</Text>
          )}
        </Box>
      </Box>
    </>
  );
}
