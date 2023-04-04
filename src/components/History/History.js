import React from 'react';
// import NumericFormat from 'react-numeric-format';

const HistoryTable = ({ payments }) => {
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h1 className='text-center '>Payment History</h1>
        <table className='bg-white p-2 rounded'>
          <thead>
            <tr>
              <th className='text-center'>Payment ID</th>
              <th className='text-center'>Date</th>
              <th className='text-center'>Amount</th>
              <th className='text-center'>Description</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId} className='border p-2'>
                <td className='border p-2'>{payment.paymentId}</td>
                <td className='border p-2'>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                {payment.transactions.length !== 0 && (
                  <td className='border p-2'>{`${payment.transactions[0].amount.total} ${payment.transactions[0].amount.currency}`}</td>
                )}
                {payment.transactions.length !== 0 && (
                  <td className='border p-2'>
                    {payment.transactions[0].description}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
