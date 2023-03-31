import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ItemNav from './ItemNav';

const User = () => {
  const { user } = useContext(AuthContext);

  // Will render User if user logged in
  return (
    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
      {!user && (
        <li className='nav-item'>
          <Link className='nav-link' aria-current='page' to='/login'>
            Login
          </Link>
        </li>
      )}

      {!user && (
        <li className='nav-item'>
          <Link className='nav-link' aria-current='page' to='/register'>
            Register
          </Link>
        </li>
      )}

      {user && (
        <li className='nav-item'>
          <Link className='nav-link' aria-current='page' to='/cart'>
            Cart
            <i className='fas fa-shopping-cart'></i>
          </Link>
        </li>
      )}
      {user && <ItemNav />}
    </ul>
  );
};

export default User;
