const Button: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className={`py-1 px-6 text-white bg-primary border-2 border-primary rounded-full hover:text-primary hover:bg-transparent`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
