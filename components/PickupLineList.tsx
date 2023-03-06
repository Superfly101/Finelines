import PickupLine from "@/models/pickupLine";
import Card from "./UI/Card";

const PickupLinesList = () => {
  const PICKUP_LINE_LIST: PickupLine[] = [
    {
      id: "1",
      text: "You look single, I wanna put an end to your single life",
      user: "Superfly",
      category: ["Lovely"],
    },
    {
      id: "2",
      text: "I'll rather lie with you than lie to you",
      user: "Superfly",
      category: ["Dirty"],
    },
    {
      id: "3",
      text: "I would have loved you to be my sunshine to brighten up my day. But I'd prefer you to be my moon to brighten up my night cuse, at night is when I need you the most",
      user: "Superfly",
      category: ["Romance"],
    },
    {
      id: "4",
      text: "Hi, do you hook up with strangers or should I introduce myself first.",
      user: "Superfly",
      category: ["Dirty"],
    },
  ];

  return (
    <section>
      <ul className="p-4 flex flex-col gap-2">
        {PICKUP_LINE_LIST.map((pickupLine) => (
          <li key={pickupLine.id} className="w-full max-w-[60rem] mx-auto">
            <Card>
              <p>{pickupLine.user}</p>
              <p>{pickupLine.text}</p>
              <p>{pickupLine.category}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PickupLinesList;
