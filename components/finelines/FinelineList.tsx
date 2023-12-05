import LoadingSpinner from "../ui/LoadingSpinner";
import useFineline from "@/hooks/useFineline";
import MyButton from "../ui/Button";
import { useCallback, useRef, useState } from "react";
import { Heading } from "@chakra-ui/react";
import FinelineItem from "./FinelineItem";

const FinelineList = ({ onAddFineline }: { onAddFineline: () => void }) => {
  const [page, setPage] = useState(1);
  const { isLoading, finelines, hasNextPage } = useFineline(page);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastFinelineRef = useCallback(
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
    <section
      id="finelines"
      className="flex flex-col gap-8 justify-center items-center px-8 py-16 border-t-2 min-h-[50vh]"
    >
      <Heading className="mb-8">Some Finelines</Heading>
      {isLoading && finelines.length === 0 ? (
        <LoadingSpinner />
      ) : finelines.length ? (
        <ul className="flex flex-col gap-2 w-full">
          {finelines.map((fineline, index) => {
            if (finelines.length === index + 1) {
              return (
                <FinelineItem
                  ref={lastFinelineRef}
                  key={fineline._id}
                  {...fineline}
                />
              );
            }

            return <FinelineItem key={fineline._id} {...fineline} />;
          })}
        </ul>
      ) : (
        <div className="flex flex-col gap-4 p-4 text-center">
          <h3 className="font-semibold">No Pickupline found</h3>
          <MyButton
            color="blue"
            className="font-semibold"
            onClick={onAddFineline}
          >
            Submit pickup line
          </MyButton>
        </div>
      )}
    </section>
  );
};

export default FinelineList;
