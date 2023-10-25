import { useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { PickupLine } from "../models/pickupLine";

type params = {
  status: "pending" | "approved";
};

const useFineline = ({ status }: params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [finelines, setFinelines] = useState<PickupLine[]>([]);

  useEffect(() => {
    const fetchFinelines = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/pickup-lines?status=${status}`);

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          setIsLoading(false);
          return;
        }

        setFinelines(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchFinelines();
  }, []);

  return { isLoading, finelines };
};

export default useFineline;
