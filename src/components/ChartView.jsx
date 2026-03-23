import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { generateChartConfig } from '../utils/chartHelpers';

const ChartView = ({ data, chartType = 'bar' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const config = generateChartConfig(data, chartType);

    if (config) {
      chartInstance.current = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartType]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartView;
