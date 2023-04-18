import Layout from "@/components/layout/Layout";
import AuthContextProvider from "@/context/auth-context";
import FinelineContextProvider from "@/context/fineline-context";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
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
