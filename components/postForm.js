import { Fragment, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";

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
import { ChatIcon, PlusSquareIcon } from "@chakra-ui/icons";

const PostForm = () => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.displayName;
  const currentUserEmail = authCtx.email;
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postInputRef = useRef();
  const maxChars = 150

    const FIREBASE_API = process.env.NEXT_PUBLIC_FIREBASEDB;

  const submitPostHandler = (event) => {
    event.preventDefault();

    const enteredPost = postInputRef.current.value;

    if (enteredPost.trim().length !== 0) {
      if (enteredPost.trim().length <= maxChars) {
        fetch(
          `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/`
        );
      }
    }
  }

  return (
    <Fragment>
      <Container>
        <Flex justify="center" align="center" mt="10">
          <Box>
            <Button onClick={onOpen}>Post</Button>
          </Box>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            What are you cooking {currentUser}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitPostHandler}>
              <FormControl id="text">
                <Textarea
                  bg="gray.600"
                  ref={postInputRef}
                  placeholder="I am cooking..."
                ></Textarea>
                <FormHelperText>150 chars max</FormHelperText>
              </FormControl>
              <Flex flexDir="row-reverse">
                <Button type="submit" rightIcon={<ChatIcon />}>
                  Post
                </Button>
                <Button type="button" mr="2" rightIcon={<PlusSquareIcon />}>
                  Add image
                </Button>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default PostForm;
