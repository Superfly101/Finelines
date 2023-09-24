import { Button } from "@chakra-ui/react";

type ButtonProp = {
  active?: boolean;
  children: React.ReactNode;
  icon: React.ReactElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({ icon, children, onClick, active }: ButtonProp) => {
  return (
    <Button
      onClick={onClick}
      color={active ? "blue.400" : ""}
      leftIcon={icon}
      variant="ghost"
    >
      {children}
    </Button>
  );
};

export default IconButton;
