import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../ui/Button";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 py-4 px-4 bg-tertiary flex items-center justify-between md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleClick}>Add pick up line</Button>
        <Button type="secondary" onClick={handleClick}>
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
