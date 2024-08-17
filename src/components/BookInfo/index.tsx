import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
} from "@nextui-org/react";
import { Book } from "../../types";
import { useEffect, useState } from "react";

interface Props {
  book: Book;
  openModal: boolean;
  onCloseModal: () => void;
}
const BookInfoModal = ({ book, openModal, onCloseModal }: Props) => {
  return (
    <Modal
      isOpen={openModal}
      onClose={onCloseModal}
      backdrop="blur"
      className="w-screen h-11/12"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-sm">
              {book.title}
              <span className="text-xs font-light">
                {book.authors.join(",")}
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-between">
                <Image
                  src={book.image || "./not-found.jpg"}
                  alt="book cover"
                  width={120}
                  height={180}
                  loading="lazy"
                  className="mt-2 max-w-fit rounded-none sm:w-1"
                />
                <div></div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookInfoModal;
