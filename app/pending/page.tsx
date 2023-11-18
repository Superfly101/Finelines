"use client";

import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pending from "../components/Finelines/Pending";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useFineline from "../hooks/useFineline";
import { PickupLine } from "../models/pickupLine";

const Page = () => {
  const { data: session } = useSession();

  const { finelines, isLoading, sendRequest: fetchFinelines } = useFineline();
  const [pendingFinelines, setPendingFinelines] = useState<PickupLine[] | null>(
    null
  );

  useEffect(() => {
    if (session?.user.role === "user") {
      fetchFinelines({
        url: `pickup-lines?status=pending&user=${session?.user.username}`,
      });
    } else if (session?.user.role === "admin") {
      fetchFinelines({
        url: `pickup-lines?status=pending`,
      });
    }

    setPendingFinelines([...finelines]);
  }, [session?.user, fetchFinelines]);

  return (
    <section className="px-4 py-8">
      {isLoading || isLoading === null ? (
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

export default Page;
