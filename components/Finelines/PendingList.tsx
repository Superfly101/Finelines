"use client";

import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pending from "./Pending";
import LoadingSpinner from "../ui/LoadingSpinner";
import useCustomToast from "@/hooks/useCustomToast";
import useFineline from "@/hooks/useFineline";
import { PickupLine } from "@/types/pickupLine";

const PendingList = () => {
  const { data: session } = useSession();
  const {
    finelines,
    isLoading,
    error,
    sendRequest: fetchFinelines,
  } = useFineline();
  const [pendingFinelines, setPendingFinelines] = useState<PickupLine[] | null>(
    null
  );

  useEffect(() => {
    try {
      if (session?.user.role === "user") {
        fetchFinelines({
          url: `pickup-lines?status=pending&user=${session?.user.username}`,
        });
      } else if (session?.user.role === "admin") {
        fetchFinelines({
          url: `pickup-lines?status=pending`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [session?.user, fetchFinelines]);

  useEffect(() => {
    setPendingFinelines(finelines);
  }, [finelines]);

  return (
    <section className="px-4 py-">
      {isLoading || isLoading === undefined ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col gap-4">
          {pendingFinelines?.length ? (
            pendingFinelines.map((fineline) => (
              <Pending
                key={fineline._id}
                {...fineline}
                updateFinelines={setPendingFinelines}
              />
            ))
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
