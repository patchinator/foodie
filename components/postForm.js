import { Container, Box, Button, Flex } from "@chakra-ui/react";

const PostForm = () => {
  return (
    <Container>
      <Flex justify="center" align="center" mt="10">
        <Box>
          <Button>What are you cooking...?</Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default PostForm;
