import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { PickupLine } from "../types/pickupLine";
import useCustomToast from "./useCustomToast";

type Config = {
  url: string;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit;
};

const useFineline = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [finelines, setFinelines] = useState<PickupLine[]>([]);
  const { addToast } = useCustomToast();

  const sendRequest = useCallback(
    async ({ url, method = "GET", headers, body }: Config) => {
      try {
        setError(null);
        setIsLoading(true);

        const res = await fetch(`${apiUrl}/${url}`, {
          method: method,
          headers: headers ? headers : {},
          body: body ? body : null,
        });

        const data = await res.json();

        if (!res.ok) {
          console.log(data);
          setError(data.message);
          setIsLoading(false);
          addToast({
            status: "error",
            title: "An error occured, please try again later.",
            position: "bottom-left",
          });
          return;
        }

        setFinelines(data);
        setIsLoading(false);
        return data;
      } catch (err) {
        console.log(err);
        addToast({
          status: "error",
          title: "An error occured, please try again later.",
          position: "bottom-left",
        });
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, finelines, setFinelines, sendRequest };
};

export default useFineline;
