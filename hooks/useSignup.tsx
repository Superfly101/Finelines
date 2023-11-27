import { apiUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCustomToast from "./useCustomToast";

const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useCustomToast();

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError("");

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

    addToast({
      title: "Account created, please sign in",
      position: "top",
      status: "success",
    });

    router.push("/login");

    setIsLoading(false);
  };

  return { signup, isLoading, error };
};

export default useSignup;
