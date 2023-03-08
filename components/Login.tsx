import Link from "next/link";
import Button from "./ui/Button";

const Login = () => {
  const handleClick = () => {};

  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[30rem] mx-auto">
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Login
        </h2>
        <form className="w-full flex flex-col gap-4">
          <div className="form-control">
            <label>Username or Email</label>
            <input type="text" placeholder="Username" />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <div className="mt-4 form-control">
            <Button onClick={handleClick}>Login</Button>

            <small className="text-primary text-center font-[500]">
              Don't have an account?{" "}
              <Link href="/register">
                <span className="underline">Register</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
