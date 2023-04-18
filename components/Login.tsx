import Link from "next/link";
import { useState } from "react";
import Button from "./ui/Button";

const Login = () => {
  const [formDate, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleClick = () => {};

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[25rem] mx-auto">
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Login
        </h2>
        <form className="w-full flex flex-col gap-4">
          <div className="form-control">
            <label>Username or Email</label>
            <input type="text" />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <div className="mt-4 form-control">
            <button className="py-2 px-4 text-white text-sm bg-secondary rounded-full">
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
