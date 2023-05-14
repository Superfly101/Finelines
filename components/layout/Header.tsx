import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between bg-white md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <nav className="flex gap-4 text-black items-center">
        {user && (
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
        {!user && (
          <div className="flex gap-4 items-center">
            <Link href="/signup">Sign up</Link>
            <Link
              href="/login"
              className="border border-blue text-blue py-1 px-4 rounded-full"
            >
              Sign in
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
