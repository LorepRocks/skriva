import React from 'react';
import './App.css';
import BookProvider from './components/Providers/BooksProvider';
import SearchBooksBar from './components/SearchBooksBar';
import BookList from './components/BookList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookProvider>
        <div className="container">
          <SearchBooksBar/>
          <BookList/>
        </div>
      </BookProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
