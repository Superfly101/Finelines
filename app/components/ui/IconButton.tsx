import { Button, Text } from "@chakra-ui/react";

type ButtonProp = {
  active?: boolean;
  icon: React.ReactElement;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const IconButton = ({ icon, onClick, className, children }: ButtonProp) => {
  return (
    <Button onClick={onClick} className={className}>
      <Text className="flex gap-2 items-center">
        {children}
        <span>{icon}</span>
      </Text>
    </Button>
  );
};

export default IconButton;
