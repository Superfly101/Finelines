import Layout from "@/components/layout/Layout";
import AuthContextProvider from "@/context/auth-context";
import FinelineContextProvider from "@/context/fineline-context";
import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

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
