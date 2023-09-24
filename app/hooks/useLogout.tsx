import { apiUrl } from "@/app/constants";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    try {
      await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Remove user from local storage
      // localStorage.removeItem("user");

      // Dispatch logout action
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};

export default useLogout;
