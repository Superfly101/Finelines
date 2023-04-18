import { User } from "@/models/User";
import { AuthActionType, authInitialState, authReducer } from "@/reducers/auth";
import { createContext, Dispatch, useEffect, useReducer } from "react";

type CtxProp = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  dispatch: Dispatch<AuthActionType>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: CtxProp) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
