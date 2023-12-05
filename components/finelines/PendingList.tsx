"use client";

import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Pending from "./Pending";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Fineline, FinelinesResponse } from "@/types/Fineline";
import { apiUrl } from "@/constants";

const PendingList = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingFinelines, setPendingFinelines] = useState<Fineline[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchPendingFinelines = async (signal: AbortSignal) => {
      setIsLoading(true);
      try {
        if (!session?.user.username) return;
        const res = await fetch(
          `${apiUrl}/pickup-lines?status=pending&pageSize=50${
            session?.user.role !== "admin"
              ? `&user=${session?.user.username}`
              : ""
          }`,
          { signal: signal }
        );

        const data = await res?.json();

        if (!res?.ok) {
          throw new Error(data.message);
        }

        if (data) {
          setPendingFinelines((prev) => [
            ...prev,
            ...(data as FinelinesResponse).finelines,
          ]);
          setHasNextPage((data as FinelinesResponse).hasNextPage);
        }

        setIsLoading(false);
      } catch (error) {
        if (signal.aborted) return;
        console.log(error);
        setIsLoading(false);
        setHasNextPage(false);
      }
    };

    const controller = new AbortController();
    const { signal } = controller;

    fetchPendingFinelines(signal);

    return () => controller.abort();
  }, [session?.user.role, session?.user.username]);

  const lastPendingFineline = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return (
    <section className="px-4 py-">
      {isLoading || isLoading === undefined ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col gap-4">
          {pendingFinelines?.length ? (
            pendingFinelines.map((fineline, index) => {
              if (pendingFinelines.length === index + 1) {
                return (
                  <Pending
                    ref={lastPendingFineline}
                    key={fineline._id}
                    {...fineline}
                    updateFinelines={setPendingFinelines}
                  />
                );
              }

              return (
                <Pending
                  key={fineline._id}
                  {...fineline}
                  updateFinelines={setPendingFinelines}
                />
              );
            })
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center h-96">
              <Text className="font-semibold text-xl">
                No pending pickup line
              </Text>
              <Link
                href="/"
                className="bg-blue-300 py-1 px-4 text-white rounded-md"
              >
                Return Home
              </Link>
            </div>
          )}
        </ul>
      )}
    </section>
  );
};

export default PendingList;
