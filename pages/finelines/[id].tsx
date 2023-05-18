import PickupLineItem from "@/components/Finelines/PickupLineItem";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import fetcher from "@/libs/fetch";
import { PickupLine } from "@/models/pickupLine";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import useSWR from "swr";

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
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // const [data, setData] = useState<PickupLine>();
  const router = useRouter();

  const id = router.query.id;

  const { data, error } = useSWR<PickupLine>(
    `http://localhost:5000/api/pickup-lines/${id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  return (
    <section>
      {data ? (
        <PickupLineItem {...data} showCommentSection={true} />
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default Fineline;
