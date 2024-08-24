export interface BooksType {
  books: Book[];
  updateSearchQuery: (query: string) => void;
  loading: boolean;
  query: string;
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  image: string;
  publishedDate: string;
  pages: number;
  rating: number;
}

export interface ApiBookType {
  items: Item[];
}

export interface Item {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface ImageLinks {
  thumbnail: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
  publishedDate: string;
  pageCount: number;
  averageRating: number;
}
