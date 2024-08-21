import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
  Divider,
} from "@nextui-org/react";
import { Book } from "../../types";

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
      className="w-full h-9/12 absolute bottom-0 rounded-none rounded-t-3xl m-0"
      placement="center"
    >
      <ModalContent className="bg-bg-info ">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl mt-10  items-center">
              <div className="shadow-lg mb-5">
                <Image
                  src={book.image || "./not-found.jpg"}
                  alt="book cover"
                  loading="lazy"
                  className="rounded-none w-full h-full"
                />
              </div>
              <span className="text-center">{book.title}</span>
              <span className="text-medium font-light">
                {book.authors?.join(",") || ""}
              </span>
            </ModalHeader>
            <ModalBody className="flex text-sm flex-row justify-around mb-5">
              <div className="flex flex-col items-center">
                <span>Published</span>
                <span className="text-xs mt-2">{book.publishedDate}</span>
              </div>
              <Divider
                orientation="vertical"
                className="h-10 w-0.5 bg-slate-500 rounded-sm"
              />

              <div className="flex flex-col items-center">
                <span>Pages</span>
                <span className="text-xs mt-2">{book.pages}</span>
              </div>
              <Divider
                orientation="vertical"
                className="h-10 w-0.5 bg-slate-500 rounded-sm"
              />

              <div className="flex flex-col items-center">
                <span>Rating</span>
                <span className="text-xs mt-2">{book.rating}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button
                color="secondary"
                className="w-full mb-5"
                onPress={onClose}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookInfoModal;
