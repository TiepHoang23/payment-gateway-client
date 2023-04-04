import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
// import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const handleCheckout = async () => {
    // console.log(cartData.total);
    navigate('/checkout', {
      state: {
        listItem: cartData.itemList,
        total: cartData.total,
      },
    });
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
        <button className='btn btn-primary mt-3 pl-3 ' onClick={handleCheckout}>
          CONTINUE TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
