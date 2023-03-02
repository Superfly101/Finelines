import Link from "next/link";

const Login = () => {
  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[30rem] mx-auto">
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Login
        </h2>
        <form className="w-full flex flex-col gap-2">
          <div className="form-control">
            <label>Username or Email</label>
            <input type="text" placeholder="Username" />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <div className="mt-4 form-control">
            <button className="py-1 px-6 text-white bg-secondary border-2 border-secondary rounded-full hover:text-secondary hover:bg-transparent">
              Login
            </button>

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
