export const aggregateData = (data, groupBy, metric) => {
  if (!data || !Array.isArray(data)) return {};
  
  return data.reduce((acc, item) => {
    const key = item[groupBy];
    const value = item[metric];
    
    if (key && value !== undefined) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
};

export const calculateStats = (data, field) => {
  if (!data || !Array.isArray(data)) return null;
  
  const values = data.map(item => item[field]).filter(val => val !== undefined);
  
  if (values.length === 0) return null;
  
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  
  return {
    count: values.length,
    sum,
    average: avg,
    median,
    min: Math.min(...values),
    max: Math.max(...values)
  };
};
