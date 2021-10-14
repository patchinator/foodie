import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <Box>
      <Flex
        bg="facebook.400"
        p="2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Foodie</Text>
        <Box>
          <Flex justifyContent="space-evenly" alignItems="center">
            <UnorderedList
              listStyleType="none"
              display="flex"
              alignItems="center"
            >
              {!isLoggedIn && (
                <ListItem mr="2">
                  <Link href="/auth/log-in">Login</Link>
                </ListItem>
              )}
              {!isLoggedIn && (
                <ListItem>
                  <Button>Sign up</Button>
                </ListItem>
              )}
              {isLoggedIn && (
                <ListItem>
                  <Button onClick={logoutHandler}>Sign Out</Button>
                </ListItem>
              )}
            </UnorderedList>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
