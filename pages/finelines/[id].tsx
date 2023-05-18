import PickupLineItem from "@/components/Finelines/PickupLineItem";
import { PickupLine } from "@/models/pickupLine";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`http://localhost:5000/api/pickup-lines/${id}`);
  const pickupline = await res.json();
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pickupline },
  };
};

type PickupLineProps = {
  pickupline: PickupLine;
};

const Fineline = ({ pickupline }: PickupLineProps) => {
  return (
    <section>
      <PickupLineItem {...pickupline} />
    </section>
  );
};

export default Fineline;
