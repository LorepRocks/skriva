import { createContext } from "react";
import { BooksType } from "../types";

const defaultBooksContext: BooksType = {
    books: [],
    updateSearchQuery: () => {},
    loading: false,
    query: '',
  };

export const BooksContext = createContext<BooksType>(defaultBooksContext);


