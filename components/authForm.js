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

import { useState, useRef } from "react";
import getConfig from "next/config";
import { useRouter } from "next/dist/client/router";

const AuthForm = () => {
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const FIREBASE_API = process.env.NEXT_PUBLIC_FIREBASEDB;

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Container mt="10">
      <form onSubmit={submitHandler}>
        <Box>
          <Heading textAlign="center">Login</Heading>
        </Box>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="johnDoe@gmail.com"
            ref={enteredEmailRef}
          ></Input>
          <FormHelperText>We will never share your details.</FormHelperText>
        </FormControl>

        <FormControl id="password">
          <FormLabel mt="2">Password</FormLabel>
          <Input
            type="password"
            placeholder="*******"
            ref={enteredPasswordRef}
          ></Input>
          <FormHelperText>Enter your password.</FormHelperText>
        </FormControl>
        <Box mt="2">
          <Button type="submit" color="facebook.400">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AuthForm;
