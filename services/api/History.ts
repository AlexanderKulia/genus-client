import { PResponse } from ".";
import { post } from "./base";

export type Search = {
  id: number;
  word: string;
  createdAt: Date | null;
  success: boolean;
  userId: number | null;
};

export const HistoryApi = {
  getHistory: ({
    page,
    perPage,
    sortBy,
    sortOrder,
  }: {
    page: number;
    perPage: number;
    sortBy: string;
    sortOrder: string;
  }) =>
    post<PResponse<Search>>("/history", {
      page,
      perPage,
      sortBy,
      sortOrder,
    }),
  getTopSearches: ({ n }: { n: number }) =>
    post<{ count: number; word: string }[]>("history/top", { n }),
};
