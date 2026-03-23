# Report Generator Dashboard

A zero-backend React component for generating visual reports from SQL database REST APIs.

## Features

- Standalone component with no backend dependencies
- Four analysis modes: charts, statistics, tables, and real-time
- Configurable REST API connections with bearer token authentication
- Real-time data updates
- Chart.js integration for visualizations
- Sample datasets included

## Installation

```bash
npm install report-generator-dashboard
```

## Usage

```jsx
import ReportGenerator from 'report-generator-dashboard';

function App() {
  const initialConfig = {
    endpoint: 'https://api.example.com/data',
    bearerToken: 'your-token-here',
    refreshInterval: 5000, // 5 seconds
    chartType: 'bar'
  };

  return (
    <ReportGenerator initialConfig={initialConfig} />
  );
}
```

## Configuration Options

- `endpoint`: REST API endpoint URL
- `bearerToken`: Authentication token
- `refreshInterval`: Real-time update interval in milliseconds
- `chartType`: Type of chart ('bar' or 'line')

## View Modes

1. Chart View: Visualize data using Chart.js
2. Table View: Display data in a sortable table
3. Stats View: Show statistical analysis
4. Real-time View: Live data updates

## Sample Data

The package includes sample datasets for testing:
- users.json: User activity data
- products.json: Product sales data

## Development

```bash
npm install
npm start
npm test
```
