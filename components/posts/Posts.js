import { Fragment } from "react";

import PostCard from "./PostCard";
import { Container, Flex } from "@chakra-ui/layout";

const Posts = (props) => {
  return (
    <Fragment>
      <Container>
        <Flex flexDir="column">
          {props.posts.map((post) => (
            <PostCard
              id={post["id"]}
              key={post["id"]}
              user={post["user"]}
              post={post.["post"]}
              email={post["email"]}
              date={post["date"]}
            ></PostCard>
          ))}
        </Flex>
      </Container>
    </Fragment>
  );
};

export default Posts;
