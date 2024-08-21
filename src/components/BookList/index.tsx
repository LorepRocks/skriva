import { useContext, useEffect, useRef, useState } from "react";
import { BooksContext } from "../../contexts/BooksContext";
import { Book } from "../../types";
import { Image } from "@nextui-org/react";

import "./bookList.css";
import BookInfoModal from "../BookInfo";

const BookList = () => {
  const { books, loading, query } = useContext(BooksContext);
  const [openModal, setOpenModal] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
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
        <div className="w-24 h-25 bg-gray-50 overflow-x-auto mt-35 rounded-lg py-3 shadow-lg">
          {books.map((book: Book) => (
            <ul key={book.id} onClick={() => handleBookClick(book)}>
              <li className="cursor-pointer">
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
