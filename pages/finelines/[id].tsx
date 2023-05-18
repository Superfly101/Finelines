import PickupLineItem from "@/components/Finelines/PickupLineItem";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import fetcher from "@/libs/fetch";
import { PickupLine } from "@/models/pickupLine";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import useFinelinesContext from "@/hooks/useFinelinesContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  // const res = await fetch(`http://localhost:5000/api/pickup-lines/${id}`);
  // const pickupline = await res.json();
  // if (!res.ok) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {},
  };
};

type PickupLineProps = {
  pickupline: PickupLine;
};

const Fineline = () => {
  const { dispatch, finelines } = useFinelinesContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLine, setPickupLine] = useState<PickupLine>();

  const router = useRouter();

  const id = router.query.id;

  useEffect(() => {
    const getPickupLine = async () => {
      const response = await fetch(
        `http://localhost:5000/api/pickup-lines/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_FINELINES", payload: [data] });
        setPickupLine(data);
      }
    };

    getPickupLine();
  }, []);

  if (error) return <div>Failed to load</div>;

  return (
    <section>
      {pickupLine ? (
        <PickupLineItem {...finelines[0]} showCommentSection={true} />
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default Fineline;
