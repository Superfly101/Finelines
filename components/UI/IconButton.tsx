type ButtonProp = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

const IconButton = ({ icon, children }: ButtonProp) => {
  return (
    <button className="py-2 px-4 w-full rounded-md text-black flex flex-row-reverse justify-center gap-3 sm:bg-secondary-200 sm:text-white sm:hover:bg-secondary-100">
      <p className="hidden sm:block">{children}</p> {icon}
    </button>
  );
};

export default IconButton;
