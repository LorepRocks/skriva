import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('./components/SearchBooksBar', () => () => <div>SearchBar Component</div>);
jest.mock('./components/BookList', () => () => <div>BookList Component</div>);

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    expect(screen.getByText('SearchBar Component')).toBeInTheDocument();
    expect(screen.getByText('BookList Component')).toBeInTheDocument();
  });
});
