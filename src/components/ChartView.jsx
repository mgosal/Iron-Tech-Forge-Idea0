import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { generateChartConfig } from '../utils/chartHelpers';

const ChartView = ({ data, chartType = 'bar' }) => {
  const chartConfig = generateChartConfig(data, chartType);
  
  if (!chartConfig) return <div>No data available for visualization</div>;
  
  const ChartComponent = chartType === 'bar' ? Bar : Line;
  
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ChartComponent {...chartConfig} />
    </div>
  );
};

export default ChartView;
