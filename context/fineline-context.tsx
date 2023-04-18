import PickupLine from "@/models/pickupLine";
import React, { Dispatch } from "react";

type FinelineContextType = {
  finelines: PickupLine[];
  dispatch: Dispatch<ACTIONTYPE>;
};

const initialState = {
  finelines: [],
};

type ACTIONTYPE =
  | { type: "GET_FINELINES"; payload: PickupLine[] }
  | { type: "ADD_FINELINE"; payload: PickupLine }
  | { type: "DELETE_FINELINE"; payload: string }
  | { type: "LIKE_FINELINE"; payload: PickupLine }
  | { type: "COMMENT_FINELNE"; payload: PickupLine };

const FinelineReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "GET_FINELINES":
      return { finelines: action.payload };
    case "ADD_FINELINE":
      return { finelines: [...state.finelines, action.payload] };
    case "DELETE_FINELINE":
      return {
        finelines: state.finelines.filter(
          (fineline: PickupLine) => fineline._id !== action.payload
        ),
      };
    case "LIKE_FINELINE":
      return {
        finelines: state.finelines.map((fineline: PickupLine) =>
          fineline._id === action.payload._id ? action.payload : fineline
        ),
      };
    case "COMMENT_FINELNE":
      return {
        finelines: state.finelines.map((fineline: PickupLine) =>
          fineline._id === action.payload._id ? action.payload : fineline
        ),
      };
    default:
      throw new Error("Default reducer state");
  }
};

const FinelineContext = React.createContext<FinelineContextType | null>(null);

const FinelineContextProvider = () => {};

export default FinelineContextProvider;
