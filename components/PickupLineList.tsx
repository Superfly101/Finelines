import { FinelineContext } from "@/context/fineline-context";
import useAuthContext from "@/hooks/useAuthContext";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { useContext, useEffect } from "react";
import PickupLineItem from "./PickupLineItem";

const PickupLinesList = () => {
  const { user } = useAuthContext();
  const { finelines, dispatch } = useFinelinesContext();
  useEffect(() => {
    const fetchFinelines = async () => {
      const response = await fetch("http://localhost:5000/api/pickup-lines", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_FINELINES", payload: data });
      }
    };

    fetchFinelines();
  }, []);
  return (
    <section>
      <ul className="p-4 flex flex-col gap-2">
        {finelines.map((fineline) => (
          <PickupLineItem {...fineline} key={fineline._id} />
        ))}
      </ul>
    </section>
  );
};

export default PickupLinesList;
