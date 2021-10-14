import { ListItem, Box, Text } from "@chakra-ui/layout";

const PostCard = (props) => {
  return (
    <Box bg="whiteAlpha.500">
      <Text>{props.user}</Text>
      <p>{props.post}</p>
    </Box>
  );
};

export default PostCard;
