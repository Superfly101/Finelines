import useSignup from "@/hooks/useSignup";
import Link from "next/link";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await signup(username, email, password);
  };

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[30rem] mx-auto">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Sign up
        </h2>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <FormControl>
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
          <FormControl>
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

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
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

          <Checkbox> Show password</Checkbox>
          <div className="flex flex-col gap-2 pt-4">
            <Button disabled={isLoading} colorScheme="blue">
              Sign up
            </Button>

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
