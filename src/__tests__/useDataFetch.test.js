import { renderHook, act } from '@testing-library/react';
import { useDataFetch } from '../hooks/useDataFetch';

describe('useDataFetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('fetches data successfully with bearer token', async () => {
    const mockData = { results: [{ id: 1 }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useDataFetch({
      url: 'test-url',
      token: 'test-token'
    }));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledWith('test-url', {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('handles real-time updates with intervals', async () => {
    const mockData1 = { results: [{ id: 1 }] };
    const mockData2 = { results: [{ id: 2 }] };
    
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData1
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData2
      });

    jest.useFakeTimers();

    const { result } = renderHook(() => useDataFetch({
      url: 'test-url',
      token: 'test-token',
      refreshInterval: 5000
    }));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData1);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData2);
    
    jest.useRealTimers();
  });

  it('handles error states', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useDataFetch({
      url: 'test-url',
      token: 'test-token'
    }));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBe(false);
  });
});
