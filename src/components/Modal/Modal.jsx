import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Badge,
  Text,
  Box,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./TaskModal.module.scss";

const statusColors = {
  "To Do": "gray",
  "In Progress": "yellow",
  "In Development": "blue",
  Done: "green",
};

export default function TaskModal({ isOpen, onClose, task }) {
  if (!task) return null;

  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent p={6} className={styles.taskModal} bg={bgColor}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text className={styles.title}>{task.title}</Text>
            <Badge colorScheme={statusColors[task.status] || "gray"}>
              {task.status}
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* Description */}
          <Box className={`${styles.section} ${styles["section-description"]}`}>
            <Text className={styles["section-label"]}>Description</Text>
            <Text className={styles["section-content"]}>{task.description}</Text>
          </Box>

          {/* Assignee & Priority & Due Date */}
          <Flex mt={4} justify="space-between" flexWrap="wrap" gap={4}>
            <Box flex="1">
              <Text className={styles["section-label"]}>Assignee</Text>
              <Text>{task.assignee || "Unassigned"}</Text>
            </Box>
            <Box flex="1">
              <Text className={styles["section-label"]}>Priority</Text>
              <Text>{task.priority || "Normal"}</Text>
            </Box>
            <Box flex="1">
              <Text className={styles["section-label"]}>Due Date</Text>
              <Text>{task.dueDate || "No due date"}</Text>
            </Box>
          </Flex>

          {/* Subtasks */}
          <Box className={styles.subtasks} mt={6}>
            <Text className={styles["section-label"]}>Subtasks</Text>
            {task.subtasks && task.subtasks.length > 0 ? (
              task.subtasks.map((subtask) => (
                <Flex key={subtask.id} className="subtask-item">
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

          {/* Comments */}
          <Box className={styles.comments} mt={6}>
            <Text className={styles["section-label"]}>Comments</Text>
            {task.comments && task.comments.length > 0 ? (
              task.comments.map((comment, idx) => (
                <Box key={idx} className="comment-item">
                  <Text className="author-date">
                    {comment.author} — {new Date(comment.date).toLocaleDateString()}
                  </Text>
                  <Text>{comment.comment}</Text>
                </Box>
              ))
            ) : (
              <Text>No comments</Text>
            )}
          </Box>

          {/* Attachments */}
          <Box className={styles.attachments} mt={6}>
            <Text className={styles["section-label"]}>Attachments</Text>
            {task.attachments && task.attachments.length > 0 ? (
              task.attachments.map((file, idx) => (
                <Link key={idx} href={file.url} isExternal>
                  {file.filename}
                </Link>
              ))
            ) : (
              <Text>No attachments</Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
