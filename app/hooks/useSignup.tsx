import { apiUrl } from "@/app/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError("");
    console.log("Making request...");

    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.message);

      return;
    }

    // update auth context
    dispatch({ type: "LOGIN", payload: result });

    setIsLoading(false);
    router.push("/");
  };

  return { signup, isLoading, error };
};

export default useSignup;
