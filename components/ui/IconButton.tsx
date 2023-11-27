import { Box, Button } from "@chakra-ui/react";

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
      <Box className="flex gap-2 items-center">
        {children}
        <span>{icon}</span>
      </Box>
    </Button>
  );
};

export default IconButton;
