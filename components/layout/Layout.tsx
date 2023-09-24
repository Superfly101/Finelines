import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "./Header";
import { apiUrl } from "@/app/constants";
import { User } from "@/app/models/User";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
