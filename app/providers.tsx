"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./context/auth-context";
import AuthProvider from "./context/AuthProvider";
import FinelineContextProvider from "./context/fineline-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {/* <AuthContextProvider> */}
        <AuthProvider>
          <FinelineContextProvider>{children}</FinelineContextProvider>
        </AuthProvider>
        {/* </AuthContextProvider> */}
      </ChakraProvider>
    </CacheProvider>
  );
}
