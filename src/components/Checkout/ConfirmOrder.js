import { useLocation } from 'react-router-dom';
import CartItem from '../Cart/CartItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const ConfirmOrder = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const total = location.state.total;
  const listItem = location.state.listItem;
  console.log(listItem);

  const handlePayment = async () => {
    try {
      const url = 'http://localhost:8000/api/payment/paymentCart';
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.data.status) {
        throw toast(response.data.message);
      }
      window.location.replace(response.data.urlRedirect);
    } catch (error) {
      console.error(error);
      toast.error('Error making payment');
    }
  };
  return (
    <div className='p-4' style={{ backgroundColor: 'white' }}>
      <h3>Confirm your order</h3>
      {listItem && listItem.length !== 0 && (
        <div className='container p-0' id='cartContainer'>
          <ul className='list-group w-100'>
            {listItem.map((item, index) => (
              <CartItem item={item} />
            ))}
          </ul>
        </div>
      )}
      <br></br>

      <h5>
        Total:
        {total}
        VND
      </h5>

      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary mt-3 pl-3 ' onClick={handlePayment}>
          CONTINUE TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
