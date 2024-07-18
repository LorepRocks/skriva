import React from 'react';
import './App.css';
import BookProvider from './components/Providers/BooksProvider';
import SearchBooksBar from './components/SearchBooksBar';
import BookList from './components/BookList';

function App() {
  return (
    <BookProvider>
    <div className="container">
      <SearchBooksBar/>
      <BookList/>
    </div>
  </BookProvider>
  );
}

export default App;
