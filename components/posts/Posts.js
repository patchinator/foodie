import { Fragment } from "react";

import PostCard from "./PostCard";
import { Flex } from "@chakra-ui/layout";

const Posts = (props) => {
  return (
    <Fragment>
        <Flex flexDir="column">
          {props.posts.map((post) => (
            <PostCard
              id={post["id"]}
              key={post["id"]}
              user={post["user"]}
              post={post["post"]}
              email={post["email"]}
              date={post["date"]}
            ></PostCard>
          ))}
        </Flex>
    </Fragment>
  );
};

export default Posts;
