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
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatIcon, PlusSquareIcon } from "@chakra-ui/icons";

const PostForm = () => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.displayName;
  const currentUserEmail = authCtx.email;
  const toast = useToast();

    const FIREBASE_DB = process.env.NEXT_PUBLIC_FIREBASEDB;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const postInputRef = useRef();
  const maxChars = 150;

  const submitPostHandler = (event) => {
    event.preventDefault();

    const enteredPost = postInputRef.current.value;

    if (enteredPost.trim().length !== 0) {
      if (enteredPost.trim().length <= maxChars) {
        fetch(
          `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=${authCtx.token}`,
          {
            method: "POST",
            body: JSON.stringify({
              user: currentUser,
              email: currentUserEmail,
              post: enteredPost,
              date: new Date(),
            }),
          }
        );
      } else {
        toast({
          description: "Max characters exceeded",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: "Post must have at least 1 character",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
                  id="text"
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
