import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: String, email: String, password: String) => {
    setIsLoading(true);
    setError("");

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
