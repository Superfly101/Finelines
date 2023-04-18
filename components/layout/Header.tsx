import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
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
        {user && (
          <div className="flex gap-4">
            <Avatar size="sm" name={user.username} />
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
