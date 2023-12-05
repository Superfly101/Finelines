import { Button, Heading, Text } from "@chakra-ui/react";
import ScrollButton from "./ScrollButton";

const HeroSection = ({ onAddFineline }: { onAddFineline: () => void }) => {
  return (
    <section className="px-4 pb-8 max-w-[60rem] mx-auto flex flex-col text-center gap-8 min-h-[calc(100vh-80px)] justify-center md:gap-16 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <Heading>Ready to elevate your social game? </Heading>
        <Text className="text-violet-400 text-2xl">
          Whether you&apos;re aiming for a good laugh or a genuine connection,
          with our curated collection of conversation starters and pickup lines
          we&apos;ve got you covered.
        </Text>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Text className="font-semibold text-xl">Or Do You</Text>
        <Text className="text-lg font-bold">
          Have a killer line up your sleeve? Share the love! Submit your own
          lines, and our discerning admin team will give it the nod of approval.
        </Text>
        <Button onClick={onAddFineline} variant="outline" colorScheme="blue">
          Submit lines for review
        </Button>
      </div>

      <ScrollButton />
    </section>
  );
};

export default HeroSection;
