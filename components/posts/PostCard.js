import { Box, Text, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";

const PostCard = (props) => {
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

  const cardColor = useColorModeValue("green.200", "gray.800");

  return (
    <Box bg={cardColor} m="1" borderRadius="lg">
      <Flex m="2" justify="space-between">
        <Text>
          {props.user} on {days[postWeekDay]} {postDay}
          {months[postMonth] + " "}
          {postYear}
        </Text>
        <Text>{props.email}</Text>
      </Flex>
      <Box bg="whiteAlpha.900" ml="2" mr="2" borderRadius="lg">
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
            <Button mr="2" size="sm">
              test
            </Button>
            <Button size="sm">reply</Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostCard;
