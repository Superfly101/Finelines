const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: string;
}> = ({ children, onClick, className, type }) => {
  const primaryBtnClass: string =
    "text-white bg-primary border-primary hover:text-primary hover:bg-transparent";
  const secondaryBtnClass: string =
    type === "secondary"
      ? "text-primary bg-transparent border-primary hover:text-white hover:bg-primary"
      : "";
  return (
    <button
      className={`py-1 px-8 border-2 rounded-full ${
        !type ? primaryBtnClass : secondaryBtnClass
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
