import { User } from "@/types/User";

export type AuthActionType =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

type authInitialStateType = {
  user: User | null;
};
export const authInitialState = {
  user: null,
};

// console.log(initState.user);
export const authReducer = (
  state: authInitialStateType,
  action: AuthActionType
): authInitialStateType => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
