import PickupLineItem from "./PickupLineItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import useFineline from "@/app/hooks/useFineline";
import MyButton from "../ui/Button";

const PickupLinesList = () => {
  const { isLoading, finelines } = useFineline({
    status: "approved",
    isAdmin: false,
  });

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
          <MyButton color="blue" className="font-semibold">
            Submit pickup line
          </MyButton>
        </div>
      )}
    </section>
  );
};

export default PickupLinesList;
