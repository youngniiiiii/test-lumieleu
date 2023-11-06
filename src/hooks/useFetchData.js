import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchData(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    setIsLoading(true);

    async function fetchProducts() {
      try {
        const response = await axios.get(endpoint, {
          cancelToken: source.token,
        });
        const responseData = response.data;
        setData(responseData);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      source.cancel();
    };
  }, [endpoint]);

  return { data, isLoading, error };
}
