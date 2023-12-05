export type Fineline = {
  _id: string;
  user: string;
  text: string;
  tags: string[];
  likes: string[];
  comments: string[];
  createdAt: string;
  status: boolean;
};

export type FinelinesResponse = {
  finelines: Fineline[];
  itemCount: number;
  perPage: number;
  pageCount: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
};
