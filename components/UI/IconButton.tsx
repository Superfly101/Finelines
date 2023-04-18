type ButtonProp = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({ icon, children, onClick }: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 w-full rounded-md text-black flex flex-row-reverse justify-center gap-3 sm:bg-secondary sm:text-white sm:hover:bg-secondary-100"
    >
      <p className="hidden sm:block">{children}</p> {icon}
    </button>
  );
};

export default IconButton;
