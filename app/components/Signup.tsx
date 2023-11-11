"use client";

import useSignup from "@/app/hooks/useSignup";
import Link from "next/link";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import MyButton from "./ui/Button";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const { signup, error, isLoading } = useSignup();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username) return;

    await signup(username, email, password);
  };

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border py-4 px-6 rounded-md max-w-[25rem] mx-auto shadow-xl">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Heading size="md" className="mb-4 text-center">
          Sign up
        </Heading>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              placeholder="Username"
              id="username"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.id]: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              placeholder="Your email address"
              id="email"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.id]: e.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.id]: e.target.value,
                }))
              }
            />
          </FormControl>

          <Checkbox onChange={() => setIsShowPassword((current) => !current)}>
            Show password
          </Checkbox>
          <div className="flex flex-col gap-2 pt-4">
            <MyButton
              color="blue"
              type="submit"
              className="bg-blue hover:bg-blue-300"
              isLoading={isLoading}
              loadingText="Submitting"
            >
              Sign up
            </MyButton>

            <small className="text-center font-[500]">
              Have an existing account? <Link href="/login">Login</Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
