import { Box, Text, Flex, Divider } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ChevronDownIcon, DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { useToast } from "@chakra-ui/toast";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const PostCard = (props) => {
  const toast = useToast();
  const authCtx = useContext(AuthContext)

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

  const postDate = new Date(props.date);
  const postDay = postDate.getDate();
  const postWeekDay = postDate.getDay();
  const postMonth = postDate.getMonth();
  const postYear = postDate.getFullYear();

  const themeColor = useColorModeValue("green.300", "gray.800");

  const deletePostHandler = () => {
    fetch(
      `https://foodie-bcff7-default-rtdb.europe-west1.firebasedatabase.app/posts/${props.id}.json?auth=${authCtx.token}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
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

  return (
    <Flex justify="center">
      <Box bg={themeColor} mb="4" borderRadius="lg" width="40%" boxShadow="lg">
        <Flex m="2" justify="space-between">
          <Text fontWeight="bold">
            {props.user} on {days[postWeekDay]} {postDay}
            {months[postMonth] + " "}
            {postYear}
          </Text>
          <Text>{props.email}</Text>
        </Flex>
        <Box bg={useColorModeValue("green.100", "whiteAlpha.900")}>
          <Text mb="2" color="black" p="2" boxShadow="lg" flexGrow="1">
            {props.post}
          </Text>
        </Box>
        <Box m="2">
          <Flex justify="space-between">
            <Box>
              <Button size="sm">like</Button>
              <Button ml="2" size="sm">
                share
              </Button>
            </Box>
            <Box>
              <Button size="sm" mr="2" colorScheme="blue">
                Edit
              </Button>
              <IconButton
                onClick={deletePostHandler}
                size="sm"
                colorScheme="red"
                icon={<DeleteIcon />}
              />
            </Box>
          </Flex>
          <Flex>
            <Divider mb="2" mt="2" />
          </Flex>
          <form>
            <FormControl>
              <FormLabel></FormLabel>
              <Flex align="center" justify="space-between">
                <Box
                  w="40px"
                  h="40px"
                  bg={useColorModeValue("white", "gray.600")}
                  borderRadius="full"
                ></Box>
                <Input
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
                <Button borderRadius="3xl">Comment</Button>
              </Flex>
            </FormControl>
          </form>
          <Accordion mt="2" allowToggle>
            <AccordionItem>
              <AccordionButton>
                <ChevronDownIcon />
              </AccordionButton>
              <AccordionPanel></AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostCard;
