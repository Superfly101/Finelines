import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <Header />
      <main className="bg-tertiary">{props.children}</main>
    </>
  );
};

export default Layout;
