"use client";

import { Text } from "@chakra-ui/react";
import Link from "next/link";
import Pending from "../components/Finelines/Pending";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useAuthContext from "../hooks/useAuthContext";
import useFineline from "../hooks/useFineline";

const Page = () => {
  const { user } = useAuthContext();

  const { finelines, isLoading } = useFineline({
    status: "pending",
    username: user ? user.username : null,
    isAdmin: user ? user.isAdmin : false,
  });

  return (
    <section className="px-4 py-8">
      {isLoading || isLoading === null ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col gap-4">
          {finelines.length ? (
            finelines.map((fineline) => (
              <Pending key={fineline._id} {...fineline} />
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
