import React from 'react';
import { calculateStats } from '../utils/dataTransforms';

const StatsView = ({ data, field }) => {
  const stats = calculateStats(data, field);

  if (!stats) return <div>No statistical data available</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h3>Statistical Analysis</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div>
          <strong>Count:</strong> {stats.count}
        </div>
        <div>
          <strong>Sum:</strong> {stats.sum.toFixed(2)}
        </div>
        <div>
          <strong>Average:</strong> {stats.average.toFixed(2)}
        </div>
        <div>
          <strong>Median:</strong> {stats.median.toFixed(2)}
        </div>
        <div>
          <strong>Min:</strong> {stats.min.toFixed(2)}
        </div>
        <div>
          <strong>Max:</strong> {stats.max.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default StatsView;
