import Link from "next/link";
import { useEffect, useState } from "react";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeVisible = scrollPosition < 100;

      setIsVisible(shouldBeVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link
      href="#finelines"
      className={`${
        isVisible ? null : "hidden"
      } fixed bottom-8 right-0.5 left-0.5 animate-bounce p-3 border-2 border-violet-500 w-fit rounded-full mx-auto cursor-pointer`}
    >
      <svg
        className="w-6 h-6 text-violet-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </Link>
  );
};

export default ScrollButton;
