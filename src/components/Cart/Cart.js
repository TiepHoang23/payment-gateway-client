import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
// import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import CartItem from './CartItem';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/payment/myCart',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const responseData = response.data;
        if (!responseData.status) {
          toast.error(responseData.message);
          return;
        }
        setCartData(responseData.myCard);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartData();
  }, [user.token]);

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
        throw new Error(response.data.message);
      }
      window.location.replace(response.data.urlRedirect);
    } catch (error) {
      console.error(error);
      toast.error('Error making payment');
    }
  };
  return (
    <div
      className='container h-100 pt-4 pb-4'
      style={{ backgroundColor: 'white' }}
    >
      <h3>Your cart: {cartData && cartData.itemList.length}</h3>

      {cartData && cartData.itemList.length === 0 && (
        <div
          className='container d-flex flex-column'
          style={{ width: 'fit-content' }}
        >
          <img src='empty.jpg' id='empty' alt='Empty' />
          <h4 className='text-center'>Your cart is empty</h4>
          <Link className='btn btn-primary' type='button' to='/'>
            Continue shopping
          </Link>
        </div>
      )}

      {cartData && cartData.itemList.length !== 0 && (
        <div className='container p-0' id='cartContainer'>
          <ul className='list-group w-100'>
            {cartData.itemList.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </ul>
        </div>
      )}
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary mt-3 pl-3 ' onClick={handlePayment}>
          CONTINUE TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default Cart;
