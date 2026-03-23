import { render, screen } from '@testing-library/react';
import StatsView from '../components/StatsView';

describe('StatsView', () => {
  const mockData = {
    values: [10, 20, 30, 40, 50],
    labels: ['A', 'B', 'C', 'D', 'E']
  };

  it('renders basic statistics', () => {
    render(<StatsView data={mockData} />);
    
    expect(screen.getByText(/mean/i)).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument(); // mean
    expect(screen.getByText(/median/i)).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument(); // median
    expect(screen.getByText(/min/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/max/i)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('displays data distribution', () => {
    render(<StatsView data={mockData} />);
    
    expect(screen.getByTestId('distribution-chart')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<StatsView data={{ values: [], labels: [] }} />);
    
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });
});
