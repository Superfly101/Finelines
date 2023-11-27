"use client";

import { PickupLine } from "@/models/pickupLine";
import FinelinesReducer, {
  FinelineActionType,
  initialState,
} from "@/reducers/fineline";
import React, { Dispatch, useReducer } from "react";

type CtxProp = {
  children: React.ReactNode;
};

type FinelineContextType = {
  finelines: PickupLine[];
  dispatch: Dispatch<FinelineActionType>;
};

export const FinelineContext = React.createContext<FinelineContextType | null>(
  null
);

const FinelineContextProvider = ({ children }: CtxProp) => {
  const [state, dispatch] = useReducer(FinelinesReducer, initialState);

  return (
    <FinelineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FinelineContext.Provider>
  );
};

export default FinelineContextProvider;
