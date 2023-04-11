type ButtonProp = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

const IconButton = ({ icon, children }: ButtonProp) => {
  return (
    <button className="py-2 px-4 rounded-full text-black flex flex-row-reverse gap-2 sm:bg-secondary-200 sm:text-white sm:hover:bg-secondary-100">
      <p className="hidden sm:block">{children}</p> {icon}
    </button>
  );
};

export default IconButton;
