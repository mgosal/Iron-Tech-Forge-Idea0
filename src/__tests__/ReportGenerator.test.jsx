import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportGenerator from '../ReportGenerator';

describe('ReportGenerator', () => {
  it('renders without crashing', () => {
    render(<ReportGenerator />);
    expect(screen.getByTestId('report-generator')).toBeInTheDocument();
  });

  it('shows all analysis modes', () => {
    render(<ReportGenerator />);
    expect(screen.getByText(/chart/i)).toBeInTheDocument();
    expect(screen.getByText(/statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/table/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time/i)).toBeInTheDocument();
  });

  it('loads sample data correctly', async () => {
    render(<ReportGenerator />);
    const dataSelect = screen.getByLabelText(/select dataset/i);
    expect(dataSelect).toHaveValue('users');
    expect(dataSelect).toContainElement(screen.getByText('products'));
  });
});
