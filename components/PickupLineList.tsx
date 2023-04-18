import { PickupLine } from "@/models/pickupLine";
import PickupLineItem from "./PickupLineItem";

const PickupLinesList = () => {
  // const PICKUP_LINE_LIST: PickupLine[] = [
  //   {
  //     id: "1",
  //     text: "You look single, I wanna put an end to your single life",
  //     user: "Superfly",
  //     tags: ["Lovely"],
  //   },
  //   {
  //     id: "2",
  //     text: "I'll rather lie with you than lie to you",
  //     user: "Superfly",
  //     tags: ["Dirty"],
  //   },
  //   {
  //     id: "3",
  //     text: "I would have loved you to be my sunshine to brighten up my day. But I'd prefer you to be my moon to brighten up my night cuse, at night is when I need you the most",
  //     user: "Superfly",
  //     tags: ["Romance"],
  //   },
  //   {
  //     id: "4",
  //     text: "Hi, do you hook up with strangers or should I introduce myself first.",
  //     user: "Superfly",
  //     tags: ["Dirty"],
  //   },
  // ];

  return (
    <section>
      <ul className="p-4 flex flex-col gap-2">
        {/* {PICKUP_LINE_LIST.map((pickupLine) => (
          <PickupLineItem
            key={pickupLine.id}
            user={pickupLine.user}
            text={pickupLine.text}
            tags={pickupLine.tags}
          />
        ))} */}
      </ul>
    </section>
  );
};

export default PickupLinesList;
