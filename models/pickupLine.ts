export type PickupLine = {
  _id: string;
  user: string;
  text: string;
  tags: string[];
  likes: string[];
  comments: string[];
  createdAt: string;
};

export type FinelineActionType =
  | { type: "GET_FINELINES"; payload: PickupLine[] }
  | { type: "ADD_FINELINE"; payload: PickupLine }
  | { type: "DELETE_FINELINE"; payload: string }
  | { type: "LIKE_FINELINE"; payload: PickupLine }
  | { type: "COMMENT_FINELNE"; payload: PickupLine };
