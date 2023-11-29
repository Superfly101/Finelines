import { Button, Heading, Text } from "@chakra-ui/react";
import ScrollButton from "./ScrollButton";

const HeroSection = ({ onAddFineline }: { onAddFineline: () => void }) => {
  return (
    <section className="px-4 pb-8 max-w-[60rem] mx-auto flex flex-col text-center gap-8 min-h-[calc(100vh-80px)] justify-center md:gap-16 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <Heading>
          Ready to elevate your social game? Dive into a world of wit and humor
          with our curated collection of conversation starters and pickup lines.
        </Heading>
        <Text>
          Whether you&apos;re aiming for a good laugh or a genuine connection,
          we&apos;ve got you covered.
        </Text>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Text fontWeight="semibold" fontSize="3xl">
          Or
        </Text>
        <Text fontSize="lg">
          Have a killer line up your sleeve? Share the love! Submit your own
          conversation starter or pickup line, and our discerning admin team
          will give it the nod of approval.
        </Text>
        <Button onClick={onAddFineline} variant="outline" colorScheme="blue">
          Submit for review
        </Button>
      </div>

      <ScrollButton />
    </section>
  );
};

export default HeroSection;
