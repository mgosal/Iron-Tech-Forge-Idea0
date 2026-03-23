import React, { useEffect } from 'react';
import ChartView from './components/ChartView';
import TableView from './components/TableView';
import StatsView from './components/StatsView';
import ConfigPanel from './components/ConfigPanel';
import useDataFetch from './hooks/useDataFetch';
import useReportState from './hooks/useReportState';

const ReportGenerator = ({ initialConfig = {} }) => {
  const { viewMode, config, updateConfig, toggleViewMode } = useReportState();
  const { data, loading, error } = useDataFetch(config);

  useEffect(() => {
    if (config.refreshInterval > 0) {
      const interval = setInterval(() => {
        // Re-fetch data
        useDataFetch(config);
      }, config.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [config]);

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    switch (viewMode) {
      case 'chart':
        return <ChartView data={data} chartType={config.chartType} />;
      case 'table':
        return <TableView data={data} />;
      case 'stats':
        return <StatsView data={data} field={config.analysisField} />;
      case 'realtime':
        return (
          <div>
            <div>Real-time Updates: {config.refreshInterval}ms</div>
            <ChartView data={data} chartType={config.chartType} />
          </div>
        );
      default:
        return <div>Select a view mode</div>;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ConfigPanel
        config={config}
        onConfigChange={updateConfig}
        onViewModeChange={toggleViewMode}
        viewMode={viewMode}
      />
      <div style={{ marginTop: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportGenerator;
