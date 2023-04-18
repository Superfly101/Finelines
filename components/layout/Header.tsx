import useLogout from "@/hooks/useLogout";
import Link from "next/link";

const Header = () => {
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header className="sticky top-0 z-20 py-4 px-4 bg-tertiary flex items-center justify-between md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <nav className="flex gap-4">
        <button onClick={handleClick}>Logout</button>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Header;
