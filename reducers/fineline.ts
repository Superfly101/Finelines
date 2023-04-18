import { FinelineActionType, PickupLine } from "@/models/pickupLine";

type initialStateType = {
  finelines: PickupLine[];
};
export const initialState: initialStateType = {
  finelines: [],
};

const FinelinesReducer = (
  state: initialStateType,
  action: FinelineActionType
): initialStateType => {
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

export default FinelinesReducer;
