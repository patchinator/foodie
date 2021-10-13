import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box>
      <Flex bg="facebook.400" p="2" justifyContent="space-between" alignItems="center">
        <Text>Foodie</Text>
        <Box>
          <Flex justifyContent="space-evenly" alignItems="center">
          <Link href="/auth/log-in">Login</Link>
          <Button>Sign up</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
