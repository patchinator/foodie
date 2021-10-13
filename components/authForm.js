import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
  Container,
  Heading,
} from "@chakra-ui/react";

const AuthForm = () => {
  return (
    <Container mt="10">
        <form>
          <Box>
            <Heading textAlign="center">Login</Heading>
          </Box>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="johnDoe@gmail.com"></Input>
            <FormHelperText>We will never share your details.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel mt="2">Password</FormLabel>
            <Input type="password" placeholder="*******"></Input>
            <FormHelperText>Enter your password.</FormHelperText>
          </FormControl>
          <Box mt="2">
            <Button color="facebook.400">Login</Button>
          </Box>
        </form>
    </Container>
  );
};

export default AuthForm;