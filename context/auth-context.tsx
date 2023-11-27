"use client";

import { User } from "@/models/User";
import { AuthActionType, authInitialState, authReducer } from "@/reducers/auth";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import { apiUrl } from "../constants";

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
    const getUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/profile`, {
          credentials: "include",
        });
        const user = await res.json();

        if (!res.ok) {
          return null;
        }

        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
