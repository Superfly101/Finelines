import Image from "next/image";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };
  return (
    <section className="px-4 pb-8 max-w-[70rem] mx-auto flex flex-col text-center gap-8 min-h-[calc(100vh-80px)] justify-center md: gap-16 md:px-8">
      {/* <div className="flex justify-center">
        <Image
          src="/images/hero-image.png"
          alt="Landing Page image"
          width={500}
          height={500}
          priority
        />
      </div> */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-secondary font-bold">
          In need of a pick up line to show a bit of your intentions and get
          that conversation started?
        </h1>

        <h2 className="text-secondary text-xl font-[500]">
          We've got you. Be smooth with these funny, clever and corny pick up
          lines.
        </h2>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl text-secondary font-[500]">
          Or have you got a pick up line you would like to share?
        </h2>
        <button
          className="py-1 px-6 text-white bg-primary border-2 border-primary rounded-full hover:text-primary hover:bg-transparent"
          onClick={handleClick}
        >
          Add pickup line
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
