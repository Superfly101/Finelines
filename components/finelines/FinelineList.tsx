import LoadingSpinner from "../ui/LoadingSpinner";
import useFineline from "@/hooks/useFineline";
import MyButton from "../ui/Button";
import { useEffect } from "react";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { PickupLine } from "@/types/pickupLine";
import Fineline from "./Fineline";
import { Heading } from "@chakra-ui/react";

const FinelineList = ({ onAddFineline }: { onAddFineline: () => void }) => {
  const { isLoading, sendRequest: fetchFinelines } = useFineline();
  const { finelines, dispatch } = useFinelinesContext();

  useEffect(() => {
    const fetchData = async () => {
      const data: PickupLine[] = await fetchFinelines({
        url: "pickup-lines?status=approved",
      });
      dispatch({ type: "GET_FINELINES", payload: data });
    };

    fetchData();
  }, [fetchFinelines, dispatch]);

  return (
    <section
      id="finelines"
      className="flex flex-col gap-8 justify-center items-center px-8 py-16 border-t-2 min-h-[50vh]"
    >
      <Heading className="mb-8">Some Finelines</Heading>
      {isLoading ? (
        <LoadingSpinner />
      ) : finelines.length ? (
        <ul className="flex flex-col gap-2 w-full">
          {finelines.map((fineline) => (
            <Fineline {...fineline} key={fineline._id} />
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

export default FinelineList;
