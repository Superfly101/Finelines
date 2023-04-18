import { FinelineContext } from "@/context/fineline-context";
import { useContext } from "react";

const useFinelinesContext = () => {
  const context = useContext(FinelineContext);

  if (!context) {
    throw new Error(
      "finelineContext has to be used within <AuthContext.Provider>"
    );
  }

  return context;
};

export default useFinelinesContext;
