const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 border border-secondary rounded-lg drop-shadow-xl">
      {children}
    </div>
  );
};

export default Card;
