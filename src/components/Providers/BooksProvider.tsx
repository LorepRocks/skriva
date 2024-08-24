import { ReactNode } from "react";
import { BooksContext } from "../../contexts/BooksContext";
import useBooks from "../../hooks/useBooks";

interface BookProviderProps {
  children: ReactNode;
}

const BookProvider = ({ children }: BookProviderProps) => {
  const { books, updateSearchQuery, loading, query } = useBooks();

  return (
    <BooksContext.Provider value={{ books, updateSearchQuery, loading, query }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BookProvider;
