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
import { register } from "../redux/auth/action";

const initCred = {
  name: "",
  username: "",
  email: "",
  password: "",
};
const Signup = () => {
  const dispatch = useDispatch();
  const [signupCred, setCred] = useState(initCred);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCred({ ...signupCred, [name]: value });
  };
  const userSignup = (e) => {
    e.preventDefault();
    dispatch(register(signupCred));
    <Stack>
      <Alert status="success">
        <AlertIcon />
        Signup successfull
      </Alert>
    </Stack>
  };
  return (
    <Box w="400px" p="30px" m="auto" mt="100px" boxShadow="lg">
      <Heading mb="25px" color="blue.400">
        {" "}
        <Image
          w="200px"
          m="auto"
          src="https://www.91-cdn.com/hub/wp-content/uploads/2019/02/Instagram-Featured.jpg"
        />
      </Heading>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          value={signupCred.username}
          onChange={handleInput}
        />
        <FormLabel>Name</FormLabel>
        <Input name="name" value={signupCred.name} onChange={handleInput} />
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={signupCred.email}
          onChange={handleInput}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={signupCred.password}
          onChange={handleInput}
        />
        <Button
          onClick={userSignup}
          type="submit"
          mt="25px"
          w="200px"
          bg="blue.400"
          color="white"
        >
          Sign In
        </Button>
        <FormHelperText mt="20px">
          <Link to="/login">
            Already have an account{" "}
            <Button variant="link" size="sm" color="blue.300">
              Sing In
            </Button>
          </Link>
          .
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Signup;
