import { Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };
  return (
    <section className="px-4 pb-8 max-w-[70rem] mx-auto flex flex-col text-center gap-8 min-h-[calc(100vh-80px)] justify-center md:gap-16 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <Heading>
          In need of a pick up line to show a bit of your intentions and get
          that conversation started?
        </Heading>

        <Text>
          We've got you. Be smooth with these funny, clever and corny pick up
          lines.
        </Text>
      </div>

      <h2 className="text-primary font-bold text-3xl">or</h2>

      <div className="flex flex-col items-center gap-2">
        <Text>Have you got a pick up line for us?</Text>
        <Button onClick={handleClick} variant="outline">
          Add you
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
