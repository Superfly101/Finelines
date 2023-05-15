import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import UserMenu from "./UserMenu";

const Header = () => {
  const NAV_ITEMS = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const router = useRouter();

  const active = "text-blue underline underline-offset-4";

  return (
    <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between bg-white md:px-8">
      <div className="cursor-pointer text-2xl md:hidden">
        <HamburgerIcon />
      </div>
      <div>
        <h2 className="text-3xl text-blue font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-12 font-semibold">
          {NAV_ITEMS.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`${router.pathname === item.path ? active : null}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="flex gap-4 items-center">
        {user && <UserMenu />}
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
