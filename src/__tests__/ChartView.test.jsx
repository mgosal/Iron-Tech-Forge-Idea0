import { render, screen } from '@testing-library/react';
import ChartView from '../components/ChartView';

describe('ChartView', () => {
  const mockData = {
    labels: ['A', 'B'],
    datasets: [{
      data: [1, 2]
    }]
  };

  it('renders chart container', () => {
    render(<ChartView data={mockData} />);
    expect(screen.getByTestId('chart-view')).toBeInTheDocument();
  });
});
