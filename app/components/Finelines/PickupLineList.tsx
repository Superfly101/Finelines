import PickupLineItem from "./PickupLineItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import useFineline from "@/app/hooks/useFineline";

const PickupLinesList = () => {
  // const { finelines, dispatch } = useFinelinesContext();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchFinelines = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`${apiUrl}/pickup-lines`);

  //       const data = await response.json();

  //       if (!response.ok) {
  //         console.log(data);
  //         setIsLoading(false);
  //         return;
  //       }

  //       dispatch({ type: "GET_FINELINES", payload: data });
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchFinelines();
  // }, []);

  const { isLoading, finelines } = useFineline({
    status: "approved",
    isAdmin: false,
  });

  return (
    <section>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="p-4 flex flex-col gap-2">
          {finelines.map((fineline) => (
            <PickupLineItem {...fineline} key={fineline._id} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PickupLinesList;
