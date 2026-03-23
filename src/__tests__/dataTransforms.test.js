import { 
  transformChartData,
  transformTableData,
  calculateStats
} from '../utils/dataTransforms';

describe('Data Transformations', () => {
  const sampleData = {
    results: [
      { id: 1, category: 'A', value: 100 },
      { id: 2, category: 'B', value: 200 },
      { id: 3, category: 'A', value: 150 }
    ]
  };

  describe('transformChartData', () => {
    it('groups data by category correctly', () => {
      const chartData = transformChartData(sampleData.results, 'category', 'value');
      expect(chartData).toEqual({
        labels: ['A', 'B'],
        datasets: [{
          data: [250, 200]
        }]
      });
    });
  });

  describe('transformTableData', () => {
    it('formats data for table display', () => {
      const tableData = transformTableData(sampleData.results);
      expect(tableData).toHaveLength(3);
      expect(tableData[0]).toHaveProperty('id');
      expect(tableData[0]).toHaveProperty('category');
      expect(tableData[0]).toHaveProperty('value');
    });
  });

  describe('calculateStats', () => {
    it('calculates basic statistics', () => {
      const stats = calculateStats(sampleData.results, 'value');
      expect(stats).toEqual({
        min: 100,
        max: 200,
        avg: 150,
        total: 450,
        count: 3
      });
    });
  });
});
