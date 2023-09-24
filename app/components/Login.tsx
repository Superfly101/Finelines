"use client";

import useAuthContext from "@/app/hooks/useAuthContext";
import useLogin from "@/app/hooks/useLogin";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null!);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();

  const { login, error, isLoading } = useLogin();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (!error && user) {
      router.push("/");
    }
  }, [error, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password === "") {
      return setIsError(true);
    }

    let email = "";
    let username = "";

    if (isValidEmail(userRef.current.value)) {
      email = userRef.current.value;
    } else {
      username = userRef.current.value;
    }

    await login(username, email, password);
  };

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[25rem] mx-auto">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Heading color="blue.500" size="md" className="mb-4 text-center">
          Sign in
        </Heading>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username or Email</FormLabel>
            <Input ref={userRef} />
          </FormControl>
          <FormControl isInvalid={isError}>
            <FormLabel>Password</FormLabel>

            <Input
              isInvalid={isError}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false);
              }}
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>

          <div className="flex flex-col py-2 gap-2">
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              type="submit"
              loadingText="Submitting..."
            >
              Log in
            </Button>

            <small className="text-center font-[500]">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
