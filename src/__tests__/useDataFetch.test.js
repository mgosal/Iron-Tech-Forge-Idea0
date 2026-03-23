import { renderHook } from '@testing-library/react';
import useDataFetch from '../hooks/useDataFetch';

describe('useDataFetch', () => {
  it('fetches data successfully', async () => {
    const { result } = renderHook(() => 
      useDataFetch({ 
        endpoint: '/api/data',
        token: 'test-token'
      })
    );
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    
    // Wait for data to load
    await result.current.refetch();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeTruthy();
  });

  it('handles errors gracefully', async () => {
    const { result } = renderHook(() => 
      useDataFetch({ 
        endpoint: '/invalid/endpoint'
      })
    );
    
    await result.current.refetch();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});
