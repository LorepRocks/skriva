import { useContext, useEffect, useRef, useState } from "react";
import { BooksContext } from "../../contexts/BooksContext";
import { Book } from "../../types";
import { Image, Spinner } from "@nextui-org/react";

import "./bookList.css";
import BookInfoModal from "../BookInfo";

const BookList = () => {
  const { books, loading, query, updateSearchQuery } = useContext(BooksContext);
  const [openModal, setOpenModal] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const bookElement = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      const el = event.target as HTMLElement;
      const mainContainer = el.getAttribute("data-test");
      if (mainContainer) {
        updateSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleBlur = () => {
    console.log("on blur");
  };

  return (
    <>
      {loading && (
        <Spinner color="secondary" labelColor="foreground" className="mt-5" />
      )}
      {query.length > 0 && !books.length && !loading && (
        <p>Not results found</p>
      )}
      {selectedBook && (
        <BookInfoModal
          book={selectedBook}
          openModal={openModal}
          onCloseModal={onCloseModal}
        />
      )}
      {books.length > 0 && (
        <div
          className="w-24 h-screen overflow-x-auto mt-42 md:rounded-lg py-3 md:shadow-lg md:mt-3 md:w-2/6"
          onBlur={handleBlur}
        >
          {books.map((book: Book) => (
            <ul
              key={book.id}
              onClick={() => handleBookClick(book)}
              onBlur={handleBlur}
            >
              <li className="cursor-pointer" ref={bookElement}>
                <div className="h-120 w-80">
                  <Image
                    src={book.image || "./not-found.jpg"}
                    alt="book cover"
                    width={80}
                    height={120}
                    loading="lazy"
                    className="mt-2 max-w-fit rounded-none"
                  />
                </div>

                <div className="ml-2">
                  <h5 className="text-sm font-bold">{book.title}</h5>
                  <h6 className="text-xs">{book.authors?.join(", ")}</h6>
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
};

export default BookList;
