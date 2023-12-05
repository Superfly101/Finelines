import { Fineline, FinelinesResponse } from "@/types/Fineline";

export const initialState: FinelinesResponse = {
  finelines: [],
  itemCount: 0,
  perPage: 5,
  pageCount: 1,
  currentPage: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
};

export type FinelineActionType =
  | { type: "GET_FINELINES"; payload: FinelinesResponse }
  | { type: "ADD_FINELINE"; payload: Fineline }
  | { type: "DELETE_FINELINE"; payload: string }
  | { type: "LIKE_FINELINE"; payload: Fineline }
  | { type: "COMMENT_FINELNE"; payload: Fineline };

const FinelinesReducer = (
  state: FinelinesResponse,
  action: FinelineActionType
): FinelinesResponse => {
  switch (action.type) {
    case "GET_FINELINES":
      return {
        ...action.payload,
        finelines: [...state.finelines, ...action.payload.finelines],
      };
    case "ADD_FINELINE":
      return {
        ...state,
        itemCount: (state.itemCount += 1),
        finelines: [action.payload, ...state.finelines],
      };
    case "DELETE_FINELINE":
      return {
        ...state,
        itemCount: (state.itemCount -= 1),
        finelines: state.finelines.filter(
          (fineline: Fineline) => fineline._id !== action.payload
        ),
      };
    case "LIKE_FINELINE":
      return {
        ...state,
        finelines: state.finelines.map((fineline: Fineline) =>
          fineline._id === action.payload._id ? action.payload : fineline
        ),
      };
    case "COMMENT_FINELNE":
      return {
        ...state,
        finelines: state.finelines.map((fineline: Fineline) =>
          fineline._id === action.payload._id ? action.payload : fineline
        ),
      };
    default:
      throw new Error("Default reducer state");
  }
};

export default FinelinesReducer;
