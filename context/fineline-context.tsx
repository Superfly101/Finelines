import { PickupLine, FinelineActionType } from "@/models/pickupLine";
import FinelinesReducer, { initialState } from "@/reducers/fineline";
import React, { Dispatch, useReducer } from "react";

type FinelineContextType = {
  finelines: PickupLine[];
  dispatch: Dispatch<FinelineActionType>;
};

const FinelineContext = React.createContext<FinelineContextType | null>(null);

const FinelineContextProvider = () => {
  const [state, dispatch] = useReducer(FinelinesReducer, initialState);
};

export default FinelineContextProvider;
