import Link from "next/link";

const Register = () => {
  return (
    <section className="px-4 pb-16 flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full border border-secondary p-4 rounded-md max-w-[30rem] mx-auto">
        <h2 className="my-4 text-center text-secondary font-bold text-xl">
          Sign Up
        </h2>
        <form className="w-full flex flex-col gap-2">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" placeholder="Password" id="confirm" />
          </div>
          <div className="mt-4 form-control">
            <button className="py-1 px-6 text-white bg-secondary border-2 border-secondary rounded-full hover:text-secondary hover:bg-transparent">
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

export default Register;
