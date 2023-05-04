import useLogin from "@/hooks/useLogin";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null!);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, error, isLoading } = useLogin();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let email = "";
    let username = "";

    if (isValidEmail(userRef.current.value)) {
      email = userRef.current.value;
    } else {
      username = userRef.current.value;
    }

    await login(username, email, password);

    router.push("/");
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
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Login
        </h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Username or Email</label>
            <input type="text" ref={userRef} />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 form-control">
            <button
              disabled={isLoading}
              className="py-2 px-4 text-white text-sm bg-secondary rounded-full disabled:opacity-60"
            >
              Login
            </button>

            <small className="text-center font-[500]">
              Don't have an account?{" "}
              <Link href="/signup">
                <span className="underline text-primary">Register</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
