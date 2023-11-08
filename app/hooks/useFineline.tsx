import { useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { PickupLine } from "../models/pickupLine";

type params = {
  status: "pending" | "approved";
  username?: string | null;
  isAdmin: boolean;
};

const useFineline = ({ status, username, isAdmin }: params) => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [finelines, setFinelines] = useState<PickupLine[]>([]);

  console.log(apiUrl);

  useEffect(() => {
    const fetchFinelines = async () => {
      try {
        setIsLoading(true);
        if (username !== null || isAdmin) {
          const response = await fetch(
            `${apiUrl}/pickup-lines?status=${status}${
              isAdmin ? "" : username ? `&user=${username}` : ""
            }`
          );

          const data = await response.json();

          if (!response.ok) {
            console.log(data);
            setIsLoading(false);
            return;
          }

          setFinelines(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchFinelines();
  }, [status, username, isAdmin]);

  return { isLoading, finelines };
};

export default useFineline;
