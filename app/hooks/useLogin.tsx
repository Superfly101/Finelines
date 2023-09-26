import { apiUrl } from "@/app/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const login = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiUrl}/users/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
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
    setError("");
    router.push("/");
  };

  return { login, error, isLoading };
};

export default useLogin;
