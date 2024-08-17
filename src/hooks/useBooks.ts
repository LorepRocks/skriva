import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "../utils";
import { ApiBookType, Book, BooksType, Item } from "../types";

const useBooks = (): BooksType => {
  const [query, setQuery] = useState("");

  const formatBook = (book: Item): Book => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      image: book.volumeInfo?.imageLinks?.thumbnail || "",
    };
  };

  const fetchBooks = async (term: string): Promise<Book[]> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${term}&key=${process.env.REACT_APP_BOOK_API_KEY}`,
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: ApiBookType = await response.json();
    return data.items.map((book: Item) => formatBook(book));
  };

  const { data: books = [], isLoading: loading } = useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooks(query),
    enabled: !!query.trim().length,
    staleTime: 60 * 1000 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const debouncedFetchBooks = useMemo(() => debounce(setQuery, 500), []);

  const updateSearchQuery = useCallback(
    (newQuery: string) => {
      debouncedFetchBooks(newQuery);
    },
    [debouncedFetchBooks]
  );

  return {
    books,
    updateSearchQuery,
    loading,
    query,
  };
};

export default useBooks;
