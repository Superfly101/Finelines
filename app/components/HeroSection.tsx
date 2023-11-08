import useAuthContext from "@/app/hooks/useAuthContext";
import useCustomToast from "@/app/hooks/useCustomToast";
import { Button, Heading, Text } from "@chakra-ui/react";

const HeroSection = ({ onAddFineline }: { onAddFineline: () => void }) => {
  const { user } = useAuthContext();
  const { addToast } = useCustomToast();
  return (
    <section className="px-4 pb-8 max-w-[70rem] mx-auto flex flex-col text-center gap-8 min-h-[calc(100vh-80px)] justify-center md:gap-16 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <Heading>
          In need of a pick up line to show a bit of your intentions and get
          that conversation started? We&apos;ve got you. Be smooth with these
          funny, clever and corny pick up lines.
        </Heading>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Text>
          Otherwise, if you got a pick up line you would like to share?
        </Text>
        <Button onClick={onAddFineline} variant="outline" colorScheme="blue">
          Submit for review
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
