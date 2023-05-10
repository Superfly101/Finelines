import { Button } from "@chakra-ui/react";

type ButtonProp = {
  children: React.ReactNode;
  icon: React.ReactElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({ icon, children, onClick }: ButtonProp) => {
  return (
    <Button onClick={onClick} leftIcon={icon} variant="ghost">
      {children}
    </Button>
  );
};

export default IconButton;
