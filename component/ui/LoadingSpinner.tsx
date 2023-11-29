import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <div className="py-4 flex justify-center">
      <Spinner size="lg" thickness="3px" />
    </div>
  );
};

export default LoadingSpinner;
