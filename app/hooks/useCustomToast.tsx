import { Alert, AlertTitle, ToastPosition, useToast } from "@chakra-ui/react";
import Link from "next/link";

type Toast = {
  title?: string;
  status?: "error" | "info" | "warning" | "success" | "loading";
  position?: ToastPosition;
  href?: string;
};
const useCustomToast = () => {
  const toast = useToast();
  const addToast = (res?: Toast) => {
    const title = res?.title || "Please sign in to perform this action";
    const status = res?.status || "info";
    const position = res?.position || "bottom-left";

    res?.href
      ? toast({
          title,
          status,
          isClosable: true,
          position,
          containerStyle: {
            marginTop: "4.5rem",
          },
          render: () => (
            <Link href={res.href!}>
              <Alert status={status} variant="solid">
                <AlertTitle>{title}</AlertTitle>
              </Alert>
            </Link>
          ),
        })
      : toast({
          title,
          status,
          isClosable: true,
          position,
        });
  };

  return { addToast };
};

export default useCustomToast;
