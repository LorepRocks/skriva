import {useContext, useCallback} from "react";
import {BooksContext} from "../../contexts/BooksContext";
import {Book} from "../../types";
import './bookList.css'
import { removeSpecialCharacters } from "../../utils";


const BookList = () => {
    const {books, loading, query} = useContext(BooksContext);


    const highlightText = useCallback((text: string) => {
        const formatQuery = removeSpecialCharacters(query);

        if(!formatQuery.trim()){
            return  text;
        }
        
        const regex = new RegExp(`(${formatQuery})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? <mark key={index}>{part}</mark> : part
        );
    },[query])

    return(
        <>
        {loading && <p>Loading...</p>}
        {query.length > 0 && !books.length && !loading && <p>Not results found</p>}
        {books.length > 0 && <div className="list-container">
            {books.map((book: Book) => (
                <ul key={book.id}>
                    <li>
                        <h5>{highlightText(book.title)}</h5>
                        <h6>Author: {book.authors?.join(', ')}</h6>
                    </li>
                </ul>
            ))}
        </div> }
        </>
    )
}

export default BookList;