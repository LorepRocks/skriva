import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
                <span className="text-xs">Published</span>
                <span className="text-sm mt-2">{book.publishedDate}</span>
              </div>
              <Divider
                orientation="vertical"
                className="h-10 w-0.5 bg-slate-500 rounded-sm"
              />

              <div className="flex flex-col items-center">
                <span className="text-xs">Pages</span>
                <span className="text-sm mt-2">{book.pages}</span>
              </div>
              <Divider
                orientation="vertical"
                className="h-10 w-0.5 bg-slate-500 rounded-sm"
              />

              <div className="flex flex-col items-center">
                <span className="text-xs">Rating</span>
                <span className="text-sm mt-2">{book.rating}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    color="default"
                    className="w-full mb-5 text-white"
                    onPress={onClose}
                  >
                    Save
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="p-0 m-0">
                  <DropdownItem key="read">Want to Read</DropdownItem>
                  <DropdownItem key="reading">Reading</DropdownItem>
                  <DropdownItem key="recommended">Recommended</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookInfoModal;
