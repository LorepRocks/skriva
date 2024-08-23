import { useContext, useState } from "react";

import { BooksContext } from "../../contexts/BooksContext";
import "./searchBooksBar.css";
import { removeSpecialCharacters } from "../../utils";
import { Input } from "@nextui-org/react";

const SearchBooksBar = () => {
  const [query, setQuery] = useState("");

  const { updateSearchQuery } = useContext(BooksContext);

  const handleChange = (query: string) => {
    const value = removeSpecialCharacters(query);
    setQuery(value);
    updateSearchQuery(value);
  };

  return (
    <Input
      className="w-screen px-5 text-xl md:w-2/6 md:mt-5 md:px-0"
      radius="lg"
      size="lg"
      isClearable
      placeholder="Search for a book..."
      value={query}
      onChange={(e) => handleChange(e.target.value)}
      onClear={() => handleChange("")}
    />
  );
};

export default SearchBooksBar;
