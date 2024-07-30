import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from "../utils";

type Book = {
  id: string;
  title: string;
  authors: string[];
};

type BooksType = {
  books: Book[];
  updateSearchQuery: (newQuery: string) => void;
  loading: boolean;
  query: string;
};

const useBooks = (): BooksType => {
  const [query, setQuery] = useState('');

  const formatBook = (book: any): Book => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
    };
  };

  const fetchBooks = async (term: string): Promise<Book[]> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${term}&key=${process.env.REACT_APP_BOOK_API_KEY}`,
      {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items.map((book: any) => formatBook(book));
  };


  const { data: books = [], isLoading: loading } = useQuery({
     queryKey: ['books', query],
     queryFn: () => fetchBooks(query),
     enabled: !!query.trim().length,     
  });

  const debouncedFetchBooks = useMemo(
    () => debounce(setQuery, 300),
    []
  );

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
