import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-tertiary">{children}</main>
    </>
  );
};

export default Layout;
