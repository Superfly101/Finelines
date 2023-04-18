import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>"
    );
  }

  return authContext;
};

export default useAuthContext;
