import { render, screen, fireEvent } from '@testing-library/react';
import TableView from '../components/TableView';

describe('TableView', () => {
  const mockData = {
    headers: ['ID', 'Name', 'Value'],
    rows: [
      [1, 'Item 1', 100],
      [2, 'Item 2', 200],
      [3, 'Item 3', 300]
    ]
  };

  it('renders table with correct data', () => {
    render(<TableView data={mockData} />);
    
    // Check headers
    mockData.headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    // Check rows
    mockData.rows.forEach(row => {
      row.forEach(cell => {
        expect(screen.getByText(cell.toString())).toBeInTheDocument();
      });
    });
  });

  it('supports sorting by column', () => {
    render(<TableView data={mockData} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    const cells = screen.getAllByRole('cell');
    expect(cells[1].textContent).toBe('Item 1');
    expect(cells[4].textContent).toBe('Item 2');
    expect(cells[7].textContent).toBe('Item 3');
  });

  it('supports filtering data', () => {
    render(<TableView data={mockData} />);
    
    const filterInput = screen.getByPlaceholderText('Filter...');
    fireEvent.change(filterInput, { target: { value: 'Item 2' } });

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
  });
});
