import { useToast } from "@chakra-ui/react";

type Toast = {
  title?: string;
  status?: "error" | "info" | "warning" | "success" | "loading";
};
const useCustomToast = () => {
  const toast = useToast();
  const addToast = (res?: Toast) => {
    toast({
      title: res?.title || "Please sign in to perform this action",
      status: res?.status || "error",
      isClosable: true,
      position: "bottom-left",
    });
  };

  return { addToast };
};

export default useCustomToast;
