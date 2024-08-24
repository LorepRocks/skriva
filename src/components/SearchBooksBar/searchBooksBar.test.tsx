import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBooksBar from ".";
import { BooksContext } from "../../contexts/BooksContext";

describe("SearchBar", () => {
  it("renders the search input", () => {
    const updateSearchQuery = jest.fn();

    render(
      <BooksContext.Provider
        value={{
          updateSearchQuery,
          books: [],
          loading: false,
          query: "",
        }}
      >
        <SearchBooksBar />
      </BooksContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search for a book...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls updateSearchQuery when input value changes", () => {
    const updateSearchQuery = jest.fn();

    render(
      <BooksContext.Provider
        value={{
          updateSearchQuery,
          books: [],
          loading: false,
          query: "",
        }}
      >
        <SearchBooksBar />
      </BooksContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search for a book...");

    fireEvent.change(inputElement, { target: { value: "new query" } });
    expect(inputElement).toHaveValue("new query");
    expect(updateSearchQuery).toHaveBeenCalledWith("new query");
  });
});
