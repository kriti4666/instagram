import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../redux/auth/action";

const initCred = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginCred, setCred] = useState(initCred);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCred({ ...loginCred, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hvhv")
    dispatch(authenticate(loginCred));
    <Stack>
      <Alert status="success">
        <AlertIcon />
        Signin successfull
      </Alert>
    </Stack>

  }
  return (
    <Box w="400px"  p="30px" m="auto" mt="100px" boxShadow="lg">
      <Heading mb="25px" color="blue.400">
        {" "}
        <Image w='200px' m='auto' src="https://www.91-cdn.com/hub/wp-content/uploads/2019/02/Instagram-Featured.jpg"/>
      </Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={loginCred.email}
          onChange={handleInput}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={loginCred.password}
          onChange={handleInput}
        />
        <Button mt="25px" w="200px" bg='blue.400' color='white'>
          Sign In
        </Button>
        <FormHelperText mt="20px">
          Don't have an account{" "}
          <Link to="/">
            <Button onClick={handleSubmit} variant="link" size="sm" color="blue.300">
              Sing Up
            </Button >
          </Link>
          .
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Login;
