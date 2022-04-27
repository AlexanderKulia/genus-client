export interface IResponse {
  message: string;
}

export interface PResponse<T> {
  data: T[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
}

export type GermanArticle = "der" | "die" | "das";

export { AuthApi } from "./Auth";
