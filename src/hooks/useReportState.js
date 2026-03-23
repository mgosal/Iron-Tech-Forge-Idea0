import { useState, useCallback } from 'react';

const useReportState = () => {
  const [viewMode, setViewMode] = useState('chart');
  const [config, setConfig] = useState({
    endpoint: '',
    bearerToken: '',
    refreshInterval: 0,
    chartType: 'bar'
  });

  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const toggleViewMode = useCallback((mode) => {
    if (['chart', 'table', 'stats', 'realtime'].includes(mode)) {
      setViewMode(mode);
    }
  }, []);

  return {
    viewMode,
    config,
    updateConfig,
    toggleViewMode
  };
};

export default useReportState;
