const Header = () => {
  return (
    <header className="py-4 px-8 bg-tertiary flex items-center justify-between">
      <div>
        <h2 className="text-2xl text-primary font-bold">Finelines</h2>
      </div>
      <div>
        <button className="py-2 px-6 text-white bg-primary border-2 border-primary rounded-full hover:text-primary hover:bg-transparent">
          Add pickup line
        </button>
      </div>
    </header>
  );
};

export default Header;
