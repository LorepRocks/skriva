import {useContext, useState} from "react";

import {BooksContext} from "../../contexts/BooksContext"
import "./searchBooksBar.css"
import { removeSpecialCharacters } from "../../utils";


const SearchBooksBar = () => {
    const [query, setQuery] = useState("");

    const { updateSearchQuery } = useContext(BooksContext);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = removeSpecialCharacters(e.target.value);
        setQuery(value);
        updateSearchQuery(value);
    }

    
    return (
        <input
            className="search"
            placeholder="Search for a book..."
            type="search"
            value={query}
            onChange={e => handleChange(e)}
        />
    )
}

export default SearchBooksBar;