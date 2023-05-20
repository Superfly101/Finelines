import { useToast } from "@chakra-ui/react";

type Toast = {
  message: string;
  status: "error" | "info" | "warning" | "success" | "loading";
};
const useCustomToast = () => {
  const toast = useToast();
  const addToast = (res?: Toast) => {
    toast({
      title: res?.message || "Please sign in to perform this action",
      status: res?.status || "error",
      isClosable: true,
      position: "bottom-left",
    });
  };

  return { addToast };
};

export default useCustomToast;
