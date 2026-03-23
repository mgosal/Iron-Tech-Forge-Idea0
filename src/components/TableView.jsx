import React from 'react';

const TableView = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={`${index}-${header}`} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {JSON.stringify(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
