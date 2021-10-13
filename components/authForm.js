import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from "@chakra-ui/react";

const AuthForm = () => {
  return (
    <form>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <FormHelperText>We will never share your details</FormHelperText>
        <Input type="email" placeholder="johnDoe@gmail.com"></Input>
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <FormHelperText>Enter your password</FormHelperText>
        <Input type="password" placeholder="*******"></Input>
      </FormControl>
      <Box>
        <Button color="facebook.400">Login</Button>
      </Box>
    </form>
  );
};

export default AuthForm;