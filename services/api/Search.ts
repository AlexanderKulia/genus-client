import { get } from "./base";

enum Language {
  "de",
}

//TODO check interface
export interface Word {
  id: number;
  text: string;
  language: Language;
  m: boolean;
  f: boolean;
  n: boolean;
  wikiUrl: string;
  createdAt: Date | null;
}

export const SearchApi = {
  findWord: (word: string) =>
    get<Word>("/", {
      params: {
        word,
      },
    }),
};
