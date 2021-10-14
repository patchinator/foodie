import { Fragment } from "react";

import {
  Container,
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

const PostForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Container>
        <Flex justify="center" align="center" mt="10">
          <Box>
            <Button onClick={onOpen}>What are you cooking...?</Button>
          </Box>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            What you cooking good looking
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tell us something</FormLabel>
              <Textarea placeholder="I am cooking..."></Textarea>
              <FormHelperText>150 chars max</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr="2">Post</Button>
            <Button>Add image</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default PostForm;
