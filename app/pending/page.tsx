"use client";

import Pending from "../components/Finelines/Pending";
import PickupLineItem from "../components/Finelines/PickupLineItem";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useFineline from "../hooks/useFineline";

const Page = () => {
  const { finelines, isLoading } = useFineline({ status: "pending" });
  return (
    <section>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {finelines.map((fineline) => (
            <Pending key={fineline._id} {...fineline} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
