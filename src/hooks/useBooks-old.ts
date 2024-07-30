import {useState, useCallback, useMemo} from "react";

import { debounce } from "../utils";
import {Book, BooksType, Item} from "../types"


const useBooks = () : BooksType => {
    const [books, setBooks] = useState([] as Book[]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const formatBook = (book: Item): Book => {
        return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
        }
    }

    const fetchBooks = useCallback(async (term: string) => {
        setLoading(true);
        if (!term.trim().length) {
            setBooks([]);
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${term}&key=${process.env.REACT_APP_BOOK_API_KEY}`, {
                cache: 'force-cache',
                headers: {
                    'Cache-Control': 'max-age=3600',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const formattedBooks = data.items.map((book: Item) => formatBook(book));
            setBooks(formattedBooks);
        } catch (error) {
            console.error('Fetching books failed:', error);
        } finally {
            setLoading(false);
        }
    }, []);


    const debouncedFetchBooks = useMemo(() => debounce(fetchBooks, 300), [fetchBooks]);

    const updateSearchQuery = useCallback((newQuery: string) => {
        setQuery(newQuery);
        debouncedFetchBooks(newQuery);
    },[debouncedFetchBooks])


    return {
        books,
        updateSearchQuery,
        loading,
        query,
    }
}

export default useBooks;