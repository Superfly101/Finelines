import { apiUrl } from "@/constants";
import useFineline from "@/hooks/useFineline";
import { Fineline } from "@/types/Fineline";
import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import MyButton from "../ui/Button";
import CustomModal from "../ui/CustomModal";

type Props = Fineline & {
  updateFinelines: Dispatch<SetStateAction<Fineline[] | null>>;
};

const Pending = ({ _id, user, text, tags, status, updateFinelines }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<string | null>(null);

  const { data: session } = useSession();
  const { isLoading, error, finelines, setFinelines, sendRequest } =
    useFineline();
  const [isApprovingFineline, setIsApprovingFineline] = useState(false);
  const [isRejectingFineline, setIsRejectingFineline] = useState(false);

  const updatePickupline = async (action: string) => {
    if (session?.user) {
      await sendRequest({
        url: `pickup-lines/${_id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({ status: action }),
      });
    }
    setIsApprovingFineline(false);
    setIsRejectingFineline(false);
    updateFinelines((current) =>
      current ? current.filter((fineline) => fineline._id !== _id) : null
    );
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
    onClose();
    if (action === "Approve") {
      setIsApprovingFineline(true);
      updatePickupline("approved");
    } else if (action === "Reject") {
      setIsRejectingFineline(true);
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
            {session?.user?.role == "admin" ? (
              <>
                <MyButton
                  color="blue"
                  rightIcon={<CheckIcon />}
                  className="w-full"
                  onClick={handleApprove}
                  isLoading={isLoading && isApprovingFineline}
                  isDisabled={isLoading && isApprovingFineline}
                  loadingText="Approving..."
                >
                  Approve
                </MyButton>
                <MyButton
                  color="red"
                  className="w-full"
                  onClick={handleReject}
                  isLoading={isLoading && isRejectingFineline}
                  isDisabled={isLoading && isRejectingFineline}
                  loadingText="Rejecting..."
                >
                  Reject
                </MyButton>
              </>
            ) : (
              <p>Status: {status}</p>
            )}
          </div>
        </section>
      </li>
    </>
  );
};

export default Pending;
