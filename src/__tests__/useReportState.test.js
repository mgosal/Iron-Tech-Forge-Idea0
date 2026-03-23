import { renderHook, act } from '@testing-library/react';
import { useReportState } from '../hooks/useReportState';

describe('useReportState', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useReportState());
    
    expect(result.current.state).toEqual({
      mode: 'chart',
      config: {
        refreshInterval: 5000,
        chartType: 'bar',
        dataSource: 'users'
      }
    });
  });

  it('updates view mode', () => {
    const { result } = renderHook(() => useReportState());
    
    act(() => {
      result.current.setMode('table');
    });
    
    expect(result.current.state.mode).toBe('table');
  });

  it('updates configuration', () => {
    const { result } = renderHook(() => useReportState());
    
    act(() => {
      result.current.updateConfig({
        refreshInterval: 10000,
        chartType: 'line'
      });
    });
    
    expect(result.current.state.config).toEqual({
      refreshInterval: 10000,
      chartType: 'line',
      dataSource: 'users'
    });
  });

  it('persists state changes', () => {
    const { result, rerender } = renderHook(() => useReportState());
    
    act(() => {
      result.current.setMode('stats');
      result.current.updateConfig({ chartType: 'pie' });
    });
    
    rerender();
    
    expect(result.current.state).toEqual({
      mode: 'stats',
      config: {
        refreshInterval: 5000,
        chartType: 'pie',
        dataSource: 'users'
      }
    });
  });
});
