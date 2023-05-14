import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/users/login", {
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

    // Save user to local storage
    localStorage.setItem("user", JSON.stringify(result));

    // update auth context
    dispatch({ type: "LOGIN", payload: result });

    setIsLoading(false);
  };

  return { login, isLoading, error };
};

export default useLogin;
