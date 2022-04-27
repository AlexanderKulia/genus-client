import { GermanArticle } from ".";
import { get, post } from "./base";
import { Word } from "./Search";

export interface PracticeResults {
  [key: string]: {
    word: string;
    guess: string;
    genera: string[];
    success: boolean;
  };
}

export const PracticeApi = {
  getWords: (n: number, failedOnly: string) =>
    get<Word[]>("/practice/words", { params: { n, failedOnly } }),
  getResults: (guesses: { [key: string]: GermanArticle }) =>
    post<PracticeResults>("/practice/results", guesses),
};
