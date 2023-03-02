const Header = () => {
  return (
    <header className="py-4 px-4 bg-tertiary flex items-center justify-between md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">Finelines</h2>
      </div>
      <div>
        <button className="py-1 px-6 text-white bg-primary border-2 border-primary rounded-full hover:text-primary hover:bg-transparent">
          Add pickup line
        </button>
      </div>
    </header>
  );
};

export default Header;
