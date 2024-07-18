import { renderHook, waitFor } from '@testing-library/react';
import useBooks from './useBooks';
import { act } from 'react';

jest.mock('../utils', () => ({
  debounce: (fn: any, delay: number) => fn,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ items: [] }),
  })
) as jest.Mock;

describe('useBooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBooks());
    expect(result.current.books).toEqual([]);
    expect(result.current.query).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should update query and fetch books', async () => {
    const mockBooks = [
      {
        id: '1',
        volumeInfo: {
          title: 'Book Title 1',
          authors: ['Author 1'],
        },
      },
      {
        id: '2',
        volumeInfo: {
          title: 'Book Title 2',
          authors: ['Author 2'],
        },
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockBooks }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.updateSearchQuery('test');
    });

    expect(result.current.query).toBe('test');
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
        expect(result.current.books).toEqual([
            { id: '1', title: 'Book Title 1', authors: ['Author 1'] },
            { id: '2', title: 'Book Title 2', authors: ['Author 2'] },
          ]);
    });
    
  });

  it('should handle empty search query', async () => {
    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.updateSearchQuery('');
    });

    expect(result.current.query).toBe('');
    expect(result.current.loading).toBe(false);
    expect(result.current.books).toEqual([]);
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down')) as jest.Mock;

    const { result } = renderHook(() => useBooks());

    act(() => {
      result.current.updateSearchQuery('test');
    });


    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
        expect(result.current.books).toEqual([]);
    });

  });
});
