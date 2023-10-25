import { apiUrl } from "@/app/constants";
import { PickupLine } from "@/app/models/pickupLine";
import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import MyButton from "../ui/Button";
import CustomModal from "../ui/CustomModal";

const Pending = ({ _id, user, text, tags }: PickupLine) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<string | null>(null);

  const updatePickupline = async (action: string) => {
    const res = await fetch(`${apiUrl}/pickup-lines/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status: action }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("An error occured:", data);
      return;
    }

    console.log(data);
  };

  const handleReject = async () => {
    setAction("Reject");
    onOpen();
  };

  const handleApprove = () => {
    setAction("Approve");
    onOpen();
  };

  const handleAction = () => {
    if (action === "Approve") {
      updatePickupline("approved");
    } else if (action === "Reject") {
      updatePickupline("rejected");
    }
  };

  return (
    <>
      <CustomModal
        onClose={onClose}
        isOpen={isOpen}
        title={`Confirm ${action}`}
        body={"Are you sure you want to approve this pickup line?"}
        secondaryAction={action}
        handleClick={handleAction}
      />
      <li
        className={`flex flex-col w-full max-w-[40rem] mx-auto p-4 border rounded-lg drop-shadow-xl`}
      >
        <section>
          <div className="relative flex gap-2 items-center">
            <Avatar />
            <Text className="font-semibold">{user}</Text>
          </div>
          <Text className="py-2">{text}</Text>
          {tags && (
            <small className="flex gap-1">
              Tags:
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <p key={index}>{tag}</p>
                ))}
              </div>
            </small>
          )}
          <div className="flex gap-4 pt-4">
            <MyButton
              color="blue"
              rightIcon={<CheckIcon />}
              className="w-full"
              onClick={handleApprove}
            >
              Approve
            </MyButton>
            <MyButton color="red" className="w-full" onClick={handleReject}>
              Reject
            </MyButton>
          </div>
        </section>
      </li>
    </>
  );
};

export default Pending;
