"use client";

import {
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MyButton from "./ui/Button";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null!);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

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

    try {
      setError(null);
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        username,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setIsLoading(false);
        if (res?.error && res.error.includes("CredentialsSignin")) {
          setError("Invalid email or password");
        }
        return;
      }

      router.push("/");
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border py-6 px-6 rounded-md max-w-[25rem] mx-auto shadow-xl">
        {error && (
          <Alert status="error" className="mb-4">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Heading size="md" className="mb-4 text-center">
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
            <MyButton
              color="blue"
              isLoading={isLoading}
              type="submit"
              loadingText="Signing In..."
              className="bg-blue hover:bg-blue-300"
            >
              Sign in
            </MyButton>

            <small className="text-center font-[500]">
              Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
