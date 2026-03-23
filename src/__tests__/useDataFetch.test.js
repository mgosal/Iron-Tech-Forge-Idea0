import { renderHook } from '@testing-library/react';
import { useDataFetch } from '../hooks/useDataFetch';

describe('useDataFetch', () => {
  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useDataFetch({
      url: 'test-url',
      token: 'test-token'
    }));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });
});
