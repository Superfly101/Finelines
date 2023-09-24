import Layout from "@/components/layout/Layout";
import { apiUrl } from "@/app/constants";
import AuthContextProvider from "@/context/auth-context";
import FinelineContextProvider from "@/context/fineline-context";
import { User } from "@/app/models/User";
import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

// type Props = AppProps & InferGetServerSidePropsType<typeof getServerSideProps>;

// export const getServerSideProps = (async (context) => {
//   console.log("Running");
//   const res = await fetch(`${apiUrl}/users/profile`, {
//     credentials: "include",
//   });

//   const user = await res.json();
//   return {
//     props: { user },
//   };
// }) satisfies GetServerSideProps<{ user: User }>;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <FinelineContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FinelineContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
