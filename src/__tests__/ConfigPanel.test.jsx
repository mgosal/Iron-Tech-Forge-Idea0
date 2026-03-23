import { render, screen, fireEvent } from '@testing-library/react';
import ConfigPanel from '../components/ConfigPanel';

describe('ConfigPanel', () => {
  const mockConfig = {
    refreshInterval: 5000,
    chartType: 'bar',
    dataSource: 'users'
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all configuration options', () => {
    render(<ConfigPanel config={mockConfig} onChange={mockOnChange} />);
    
    expect(screen.getByLabelText(/refresh interval/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/chart type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data source/i)).toBeInTheDocument();
  });

  it('updates refresh interval', () => {
    render(<ConfigPanel config={mockConfig} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText(/refresh interval/i);
    fireEvent.change(input, { target: { value: '10000' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockConfig,
      refreshInterval: 10000
    });
  });

  it('updates chart type', () => {
    render(<ConfigPanel config={mockConfig} onChange={mockOnChange} />);
    
    const select = screen.getByLabelText(/chart type/i);
    fireEvent.change(select, { target: { value: 'line' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockConfig,
      chartType: 'line'
    });
  });

  it('validates refresh interval input', () => {
    render(<ConfigPanel config={mockConfig} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText(/refresh interval/i);
    fireEvent.change(input, { target: { value: '-1000' } });
    
    expect(screen.getByText(/must be positive/i)).toBeInTheDocument();
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
