import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { Fineline } from "../types/Fineline";
import useCustomToast from "./useCustomToast";

type Config = {
  url?: string;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit;
};

const useFineline = (page: number, status: String = "approved") => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [finelines, setFinelines] = useState<Fineline[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { addToast } = useCustomToast();

  // const sendRequest = useCallback(
  //   async ({ url, method = "GET", headers, body }: Config) => {
  //     try {
  //       setError(null);
  //       setIsLoading(true);

  //       const res = await fetch(`${apiUrl}/${url}`, {
  //         method: method,
  //         headers: headers ? headers : {},
  //         body: body ? body : null,
  //       });

  //       const data = await res.json();

  //       if (!res.ok) {
  //         console.log(data);
  //         setError(data.message);
  //         setIsLoading(false);
  //         addToast({
  //           status: "error",
  //           title: "An error occured, please try again later.",
  //           position: "bottom-left",
  //         });
  //         return;
  //       }

  //       setFinelines(data.finelines);
  //       setIsLoading(false);
  //       return data;
  //     } catch (err) {
  //       console.log(err);
  //       addToast({
  //         status: "error",
  //         title: "An error occured, please try again later.",
  //         position: "bottom-left",
  //       });
  //       setIsLoading(false);
  //     }
  //   },
  //   []
  // );

  useEffect(() => {
    const getFinelines = async (signal: AbortSignal) => {
      try {
        setError(null);
        setIsLoading(true);

        const res = await fetch(
          `${apiUrl}/pickup-lines?status=${status}&page=${page}`,
          {
            signal: signal,
          }
        );

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

        setFinelines((prev) => [...prev, ...data.finelines]);
        setIsLoading(false);
        setHasNextPage(data.hasNextPage);
      } catch (err) {
        if (signal.aborted) return;
        addToast({
          status: "error",
          title: "An error occured, please try again later.",
          position: "bottom-left",
        });
        setIsLoading(false);
      }
    };

    const controller = new AbortController();
    const { signal } = controller;

    getFinelines(signal);

    return () => controller.abort();
  }, [page]);

  return { isLoading, error, finelines, hasNextPage };
};

export default useFineline;
