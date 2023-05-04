import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import Button from "../ui/Button";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  const handleAddPickupline = () => {};

  return (
    <header className="sticky top-0 z-20 py-4 px-4 bg-tertiary flex items-center justify-between md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <nav className="flex gap-4 text-black items-center">
        <Button onClick={handleAddPickupline}>Add pick up line</Button>
        {user && (
          <div>
            <button onClick={handleLogout}>Logout</button>
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
