export const generateChartConfig = (data, type = 'bar') => {
  if (!data) return null;

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Data Visualization'
      }
    }
  };

  switch (type) {
    case 'bar':
      return {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Values',
            data: Object.values(data),
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          }]
        },
        options: defaultOptions
      };
    case 'line':
      return {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Values',
            data: Object.values(data),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: defaultOptions
      };
    default:
      return null;
  }
};
