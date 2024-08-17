import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";

import BookProvider from "./components/Providers/BooksProvider";
import SearchBooksBar from "./components/SearchBooksBar";
import BookList from "./components/BookList";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <BookProvider>
          <div className="h-full w-full flex items-center mt-10 flex-col">
            <SearchBooksBar />
            <BookList />
          </div>
        </BookProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
