import { useContext, useRef, useState, useEffect } from "react";

import {
  Box,
  Text,
  Flex,
  Divider,
  List,
  ListItem,
  Link,
} from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { useToast } from "@chakra-ui/toast";
import AuthContext from "../../store/auth-context";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";

const PostCard = (props) => {
  const toast = useToast();
  const authCtx = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(0);

  const themeColor = useColorModeValue("green.300", "gray.800");
  const inputColor = useColorModeValue("green.100", "whiteAlpha.900");

  const commentLength = comments.filter((post) => post.postId === props.id);

  // calculate Date

  const calculateDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];
    const newDate = new Date(date);
    const minutes = newDate.getMinutes();
    const hour = newDate.getHours();
    const day = newDate.getDate();
    const weekDay = newDate.getDay();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${hour}:${
      minutes.toString().split("").length !== 1 ? minutes : "0" + minutes
    } ${days[weekDay]} ${day}-${months[month]} ${year}`;
  };

  const refreshCommentsHandler = () => {
    setRefreshComments(Math.random());
  };

  // delete comment from DB

  const deleteCommentHandler = () => {
    comments.find((comment) =>
      fetch(
        `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/comments/${comment.id}.json?auth=${authCtx.token}`,
        { method: "DELETE" }
      ).then((res) => {
        if (res.ok) {
          refreshCommentsHandler();
          toast({
            description: "Comment succesfully removed",
            position: "top",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            description: "Unable to remove comment",
            position: "top",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      })
    );
  };

  // delete posts from DB

  const deletePostHandler = () => {
    fetch(
      `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/posts/${props.id}.json?auth=${authCtx.token}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        comments.map((comment) =>
          comment.postId === props.id
            ? fetch(
                `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/comments/${comment.id}.json?auth=${authCtx.token}`,
                { method: "DELETE" }
              )
            : ""
        );
        props.onRefresh();
        toast({
          description: "Post succesfully removed",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: "Unable to remove post",
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };

  const enteredCommentRef = useRef("");
  const maxChars = 500;

  const submitCommentHandler = (event) => {
    event.preventDefault();

    const enteredComment = enteredCommentRef.current.value;
    const currentUser = authCtx.displayName;
    const currentUserEmail = authCtx.email;

    // post comments to DB

    if (enteredComment.trim().length >= 1) {
      if (enteredComment.trim().length <= maxChars) {
        fetch(
          `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=${authCtx.token}`,
          {
            method: "POST",
            body: JSON.stringify({
              comment: enteredComment,
              commentUser: currentUser,
              commentEmail: currentUserEmail,
              commentDate: new Date(),
              postId: props.id,
            }),
            headers: { "Content-Tpye": "application/json" },
          }
        ).then(refreshCommentsHandler);
      } else {
        toast({
          description: "Max characters exceeded.",
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: "Comments must have at least 1 character.",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // fetch all comments from DB

  useEffect(() => {
    fetch(
      `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=${authCtx.token}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((data) => {
        const loadedComments = [];
        for (const key in data) {
          loadedComments.push({
            commentUser: data[key].commentUser,
            commentEmail: data[key].commentEmail,
            comment: data[key].comment,
            commentDate: data[key].commentDate,
            postId: data[key].postId,
            id: key,
          });
        }
        setComments(loadedComments);
      });
  }, [refreshComments]);

  return (
    <Flex justify="center">
      <Box bg={themeColor} mb="4" borderRadius="lg" width="40%" boxShadow="lg">
        <Flex m="2" justify="space-between">
          <Box>
            <Flex>
              <Avatar name={props.user} size="xs" mr="3">
                <AvatarBadge
                  borderColor="black"
                  bg={
                    authCtx.displayName === props.user ? "green.300" : "red.400"
                  }
                  boxSize="1.25em"
                />
              </Avatar>
              <Text fontWeight="bold">
                {props.user + " " + calculateDate(props.date)}
              </Text>
            </Flex>
          </Box>
          <Text>{props.email}</Text>
        </Flex>
        <Flex justify="center">
          {props.image && <img src={props.image} alt={props.image} />}
        </Flex>
        <Box bg={useColorModeValue("green.100", "whiteAlpha.900")}>
          <Text
            mb="2"
            color="black"
            p="2"
            boxShadow="lg"
            flexGrow="1"
            whiteSpace="pre-wrap"
          >
            {props.post}
          </Text>
        </Box>
        {props.link && (
          <Box m="2">
            <Link href={props.link}>{props.link}</Link>
          </Box>
        )}
        <Box m="2">
          <Flex justify="space-between">
            <Box>
              <Button size="sm">like</Button>
              <Button ml="2" size="sm">
                share
              </Button>
            </Box>
            {authCtx.displayName === props.user && (
              <IconButton
                onClick={deletePostHandler}
                size="sm"
                colorScheme="red"
                icon={<DeleteIcon />}
              />
            )}
          </Flex>
          <Flex>
            <Divider mb="2" mt="2" />
          </Flex>
          <form onSubmit={submitCommentHandler}>
            <FormControl id="text">
              <Flex align="center" justify="space-between">
                <Avatar
                  name={authCtx.displayName}
                  size="sm"
                  position="relative"
                >
                  <AvatarBadge
                    borderWidth="thin"
                    borderColor="black"
                    bg="green.300"
                    boxSize="1.1em"
                  />
                </Avatar>

                <Input
                  ml="1"
                  mr="1"
                  height="8"
                  type="text"
                  ref={enteredCommentRef}
                  focusBorderColor={useColorModeValue("green.500", "gray.500")}
                  color="black"
                  _placeholder={{
                    color: useColorModeValue("gray.400", "gray.200"),
                  }}
                  placeholder="Write a comment..."
                  borderRadius="3xl"
                  width="80%"
                  bg={useColorModeValue("white", "gray.400")}
                ></Input>
                <Button type="submit" height="9" borderRadius="3xl">
                  Comment
                </Button>
              </Flex>
            </FormControl>
          </form>
          <Accordion mt="2" allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {commentLength.length}{" "}
                  {commentLength.length !== 1 ? "comments " : "comment "}
                  <ChevronDownIcon />
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <List>
                  {comments
                    .filter((post) => post.postId === props.id)
                    .map((comment) => (
                      <ListItem key={comment.id}>
                        <Box>
                          <Flex justify="space-between">
                            <Text>{comment.commentUser}</Text>
                            <Box>
                              <Flex>
                                <Text mb="1">
                                  {calculateDate(comment.commentDate)}
                                </Text>
                                {authCtx.displayName ===
                                  comment.commentUser && (
                                  <IconButton
                                    ml="2"
                                    onClick={deleteCommentHandler}
                                    size="xs"
                                    colorScheme="red"
                                    icon={<DeleteIcon />}
                                  />
                                )}
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                        <Box p="1" bg={inputColor} borderRadius="lg">
                          <Text color="black">{comment.comment}</Text>
                        </Box>
                        <Divider m="2" />
                      </ListItem>
                    ))}
                </List>
              </AccordionPanel>
              {commentLength.length === 0 && (
                <AccordionPanel>
                  <Text textAlign="center">
                    No comments. Be the first to comment!
                  </Text>
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostCard;
