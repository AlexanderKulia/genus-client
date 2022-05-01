import { PResponse } from ".";
import { get } from "./base";

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
    get<PResponse<Search>>("/history", {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
      },
    }),
  getTopSearches: ({ n }: { n: number }) =>
    get<{ count: number; word: string }[]>("history/top", { params: { n } }),
};
