import { Button } from "@chakra-ui/react";

type ButtonProp = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  loadingText?: string;
};

const MyButton = ({
  children,
  onClick,
  className,
  type,
  isLoading,
  loadingText,
}: ButtonProp) => {
  // const primaryBtnClass: string =
  //   "text-white bg-primary border-primary hover:text-primary hover:bg-transparent";
  // const secondaryBtnClass: string =
  //   type === "secondary"
  //     ? "text-primary bg-transparent border-primary hover:text-white hover:bg-primary"
  //     : "";
  return (
    <Button
      className={`py-1 px-4 border-2 rounded-full text-white ${className}`}
      onClick={onClick}
      isLoading={isLoading}
      loadingText={loadingText}
      disabled={isLoading}
      type={type}
    >
      {children}
    </Button>
  );
};

export default MyButton;
