import { Button } from "@chakra-ui/react";

type ButtonProp = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  color: "red" | "green" | "blue" | "yellow";
  isLoading?: boolean;
  loadingText?: string;
  isDisabled?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
};

const MyButton = ({
  children,
  onClick,
  className,
  type,
  isLoading,
  loadingText,
  isDisabled,
  color = "blue",
  rightIcon,
  leftIcon,
}: ButtonProp) => {
  const colors = {
    red: "bg-[#E53E3E] hover:bg-[#C53030]",
    blue: "bg-[#00A0DC] hover:bg-[#008CC9]",
    green: "bg-[#38A169] hover:bg-[#276749]",
    yellow: "bg-[#DD6B20] hover:bg-[#C05621]",
  };

  return (
    <button
      className={`py-2 px-4 text-white flex justify-center gap-2 ${className} ${colors[color]} disabled:opacity-60`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
    >
      <span>{leftIcon}</span>
      {isLoading ? <span>{loadingText}</span> : <span>{children}</span>}
      <span>{rightIcon}</span>
    </button>
  );
};

export default MyButton;
