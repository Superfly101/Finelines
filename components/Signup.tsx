import useSignup from "@/hooks/useSignup";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
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
          Sign Up
        </h2>
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              id="confirm"
              onChange={(e) => setConfirmPassord(e.target.value)}
            />
          </div>
          <div className="mt-4 form-control">
            <button
              disabled={isLoading}
              className="py-1 px-6 text-white bg-secondary border-2 border-secondary rounded-full disabled:opacity-60"
            >
              Sign Up
            </button>

            <small className="text-primary text-center font-[500]">
              Have an existing account?{" "}
              <Link href="/login">
                <span className="underline">Login</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
