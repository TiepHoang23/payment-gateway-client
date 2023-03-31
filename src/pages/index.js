import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Login from './Login';
import Navbar from '../components/Navbar/Navbar';
import Register from './Register';
import Cart from '../components/Cart/Cart';
import NotFound from './NotFound';

const UserApp = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='user-app d-flex flex-column'>
      <Navbar />

      <Routes>
        <Route path='/' element={user ? <Navigate to='/cart' /> : <Login />} />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        />

        <Route path='/cart' element={user ? <Cart /> : <Navigate to='/' />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default UserApp;

/* 
DESCRIPTION FOR ALL THE PATHS:
    - /                     : Homepage - showing all categories, new arrivals, best sellers, and voucher
    - /optionA              : Testing
    - /optionB              : Testing
    - /category/:category   : When user clicks on a category from homepage, will proceed to show all products of that category
    - /product/:id          : Show detail information of the product
    - /vouchers             : Show all vouchers

    - /cart                 : View cart
    - /confirm              : Confirm the order

    - /changeInfo           : Change user's contact information
    - /changePassword       : Change user's password

    - /report               : Leave a report for admin
    - /myOrders             : List all orders
    - /myOrders/:id         : View detail information for an order
*/
