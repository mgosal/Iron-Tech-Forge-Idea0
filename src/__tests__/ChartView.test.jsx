import { render, screen } from '@testing-library/react';
import ChartView from '../components/ChartView';
import { Chart as ChartJS } from 'chart.js';

// Mock Chart.js
jest.mock('chart.js');

describe('ChartView', () => {
  const mockData = {
    labels: ['A', 'B', 'C'],
    datasets: [{
      data: [1, 2, 3],
      backgroundColor: ['#ff0000', '#00ff00', '#0000ff']
    }]
  };

  beforeEach(() => {
    ChartJS.mockClear();
  });

  it('renders chart with correct data', () => {
    render(<ChartView data={mockData} type="bar" />);
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(ChartJS).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        type: 'bar',
        data: mockData
      })
    );
  });

  it('updates chart when data changes', () => {
    const { rerender } = render(<ChartView data={mockData} type="bar" />);
    
    const newData = {
      ...mockData,
      datasets: [{
        data: [4, 5, 6],
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff']
      }]
    };
    
    rerender(<ChartView data={newData} type="bar" />);
    
    expect(ChartJS.prototype.update).toHaveBeenCalled();
  });

  it('supports different chart types', () => {
    render(<ChartView data={mockData} type="line" />);
    expect(ChartJS).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        type: 'line'
      })
    );
  });
});
