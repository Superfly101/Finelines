import PickupLineItem from "@/components/Finelines/PickupLineItem";
import useAuthContext from "@/app/hooks/useAuthContext";
import { PickupLine } from "@/app/models/pickupLine";
import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.req.cookies.jwt;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const PendingPage = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [finelines, setFinelines] = useState<PickupLine[]>([]);

  useEffect(() => {
    const fetchFinelines = async () => {
      console.log("Running effect");
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/pickup-lines?user=${user?.username}&status=pending`
        );

        const data = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          console.log(data);
          return;
        }

        setIsLoading(false);
        setFinelines(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchFinelines();
  }, []);

  //   if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <section className="p-8">
        <Text size="lg">Finelines waiting approval:</Text>

        <div className="mt-8">
          {finelines.map((fineline, index) => (
            <PickupLineItem key={index} {...fineline} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PendingPage;
