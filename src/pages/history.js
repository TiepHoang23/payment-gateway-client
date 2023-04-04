import React, { useContext, useEffect, useState } from 'react';
import HistoryTable from '../components/History/History';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const History = () => {
  const [history, setHistory] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/payment/paymentHistory',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const responseData = response.data;
        console.log(responseData);
        if (!responseData.status) {
          toast.error(responseData.message);
          return;
        }
        setHistory(responseData.historyPayment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistoryData();
  }, [user.token]);
  return <div>{history && <HistoryTable payments={history} />}</div>;
};

export default History;
