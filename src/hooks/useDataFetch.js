import { useState, useEffect } from 'react';

const useDataFetch = (config) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!config.endpoint) return;
      
      setLoading(true);
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...(config.bearerToken && {
            'Authorization': `Bearer ${config.bearerToken}`
          })
        };

        const response = await fetch(config.endpoint, {
          method: 'GET',
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config.endpoint, config.bearerToken]);

  return { data, loading, error };
};

export default useDataFetch;
