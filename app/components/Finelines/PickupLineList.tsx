import PickupLineItem from "./PickupLineItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import useFineline from "@/app/hooks/useFineline";
import MyButton from "../ui/Button";
import { useEffect } from "react";

const PickupLinesList = ({ onAddFineline }: { onAddFineline: () => void }) => {
  const { isLoading, finelines, sendRequest: fetchFinelines } = useFineline();

  useEffect(() => {
    fetchFinelines({ url: "pickup-lines?status=approved" });
  }, [fetchFinelines]);

  return (
    <section className="flex justify-center items-center p-8 border-t-2 min-h-[50vh]">
      {isLoading ? (
        <LoadingSpinner />
      ) : finelines.length ? (
        <ul className="flex flex-col gap-2">
          {finelines.map((fineline) => (
            <PickupLineItem {...fineline} key={fineline._id} />
          ))}
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

export default PickupLinesList;
