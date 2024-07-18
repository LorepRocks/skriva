import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from './';
import { BooksContext } from '../../contexts/BooksContext';
import { Book } from '../../types';

describe('BookList', () => {
  const mockBooks: Book[] = [
    { id: '1', title: 'Test Book 1', authors: ['Author 1'] },
    { id: '2', title: 'Another Test Book', authors: ['Author 2', 'Author 3'] },
  ];

  it('renders loading state', () => {
    render(
      <BooksContext.Provider value={{ books: [], loading: true, query: '', updateSearchQuery: jest.fn() }}>
        <BookList />
      </BooksContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no results message when no books are found', () => {
    render(
      <BooksContext.Provider value={{ books: [], loading: false, query: 'nonexistent', updateSearchQuery: jest.fn() }}>
        <BookList />
      </BooksContext.Provider>
    );

    expect(screen.getByText('Not results found')).toBeInTheDocument();
  });

  it('renders a list of books', () => {
    render(
      <BooksContext.Provider value={{ books: mockBooks, loading: false, query: '', updateSearchQuery: jest.fn() }}>
        <BookList />
      </BooksContext.Provider>
    );

    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
    expect(screen.getByText('Another Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 2, Author 3')).toBeInTheDocument();
  });

  it('highlights query in book titles', () => {
    render(
      <BooksContext.Provider value={{ books: mockBooks, loading: false, query: 'Test', updateSearchQuery: jest.fn() }}>
        <BookList />
      </BooksContext.Provider>
    );

    const highlightedElements = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'mark' && content === 'Test';
    });
    
    expect(highlightedElements.length).toEqual(2);
  });
});
