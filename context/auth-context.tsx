import { createContext, Dispatch, useReducer } from "react";

type CtxProp = {
  children: React.ReactNode;
};

type User = {
  username: string;
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  dispatch: Dispatch<ACTIONTYPE>;
};

const initialState = {
  user: null,
};

type ACTIONTYPE = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: CtxProp) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
