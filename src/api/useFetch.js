import axios from 'axios';
import { useEffect, useState } from 'react';

export const FetchWithAuth = ({ url, method, token, body }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchOption = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    fetchOption.data = JSON.stringify(body);
  }

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios(
          'http://localhost:8000/mycard',
          fetchOption
        );
        const responseData = response.data;
        console.log('res', response);

        if (!responseData.status) {
          setError(responseData.message);
          return;
        }

        setData(responseData.myCard); // Update card data only when it has changed
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setIsPending(false);
      }
    };
    // Only fetch data when the token changes
    if (token) {
      fetchCardData();
    }
  }, [token, fetchOption]);

  return { data, isPending, error };
};
