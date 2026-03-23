import React from 'react';

const ConfigPanel = ({ config, onConfigChange, onViewModeChange, viewMode }) => {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>View Mode</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['chart', 'table', 'stats', 'realtime'].map(mode => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              style={{
                padding: '8px 16px',
                backgroundColor: viewMode === mode ? '#007bff' : '#f8f9fa',
                color: viewMode === mode ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Configuration</h3>
        <div style={{ display: 'grid', gap: '10px', maxWidth: '500px' }}>
          <div>
            <label>API Endpoint:</label>
            <input
              type="text"
              value={config.endpoint}
              onChange={(e) => onConfigChange({ endpoint: e.target.value })}
              style={{ width: '100%', padding: '8px' }}
              placeholder="https://api.example.com/data"
            />
          </div>
          
          <div>
            <label>Bearer Token:</label>
            <input
              type="password"
              value={config.bearerToken}
              onChange={(e) => onConfigChange({ bearerToken: e.target.value })}
              style={{ width: '100%', padding: '8px' }}
              placeholder="Enter bearer token"
            />
          </div>

          <div>
            <label>Refresh Interval (ms):</label>
            <input
              type="number"
              value={config.refreshInterval}
              onChange={(e) => onConfigChange({ refreshInterval: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '8px' }}
              min="0"
              step="1000"
            />
          </div>

          {viewMode === 'chart' && (
            <div>
              <label>Chart Type:</label>
              <select
                value={config.chartType}
                onChange={(e) => onConfigChange({ chartType: e.target.value })}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
