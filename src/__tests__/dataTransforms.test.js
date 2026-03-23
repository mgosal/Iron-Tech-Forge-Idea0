import { 
  transformToChartData,
  transformToTableData,
  transformToStatsData
} from '../utils/dataTransforms';

describe('Data Transformations', () => {
  const mockRawData = {
    results: [
      { id: 1, name: 'Item 1', value: 100 },
      { id: 2, name: 'Item 2', value: 200 },
      { id: 3, name: 'Item 3', value: 300 }
    ]
  };

  describe('transformToChartData', () => {
    it('converts raw data to chart format', () => {
      const chartData = transformToChartData(mockRawData);
      
      expect(chartData).toEqual({
        labels: ['Item 1', 'Item 2', 'Item 3'],
        datasets: [{
          data: [100, 200, 300],
          backgroundColor: expect.any(Array)
        }]
      });
    });

    it('handles empty data', () => {
      const chartData = transformToChartData({ results: [] });
      
      expect(chartData).toEqual({
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      });
    });
  });

  describe('transformToTableData', () => {
    it('converts raw data to table format', () => {
      const tableData = transformToTableData(mockRawData);
      
      expect(tableData).toEqual({
        headers: ['ID', 'Name', 'Value'],
        rows: [
          [1, 'Item 1', 100],
          [2, 'Item 2', 200],
          [3, 'Item 3', 300]
        ]
      });
    });

    it('handles empty data', () => {
      const tableData = transformToTableData({ results: [] });
      
      expect(tableData).toEqual({
        headers: ['ID', 'Name', 'Value'],
        rows: []
      });
    });
  });

  describe('transformToStatsData', () => {
    it('converts raw data to stats format', () => {
      const statsData = transformToStatsData(mockRawData);
      
      expect(statsData).toEqual({
        values: [100, 200, 300],
        labels: ['Item 1', 'Item 2', 'Item 3'],
        summary: {
          mean: 200,
          median: 200,
          min: 100,
          max: 300
        }
      });
    });

    it('handles empty data', () => {
      const statsData = transformToStatsData({ results: [] });
      
      expect(statsData).toEqual({
        values: [],
        labels: [],
        summary: {
          mean: 0,
          median: 0,
          min: 0,
          max: 0
        }
      });
    });
  });
});
