import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { useLogout } from '../../api/useLogout';

const ItemNav = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logout success');
  };
  return (
    <li className='nav-item dropdown'>
      <div
        className='nav-link dropdown-toggle'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {user.user.username}
      </div>
      <ul className='dropdown-menu'>
        <li>
          <div className='dropdown-item' onClick={handleLogout}>
            Logout
          </div>
        </li>
      </ul>
    </li>
  );
};

export default ItemNav;

/* 
<div>
            <li className="nav-item mx-2 px-2">
                <a className="nav-link" aria-current="page" href="#">
                    Cart
                    <i className="fas fa-shopping-cart"></i>
                </a>
            </li>
            
            <li className="nav-item dropdown mx-2 px-2">
                <a className="nav-link dropdown-toggle" href="#"
                    role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Settings
                </a>
                <ul className="dropdown-menu">
                    <li><p className="dropdown-item-text mb-0" style="font-weight: bold;">Welcome back!</p></li>
                    <li><p className="dropdown-item-text">User email</p></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="/myOrders">My orders</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="/changeInfo">Change information</a></li>
                    <li><a className="dropdown-item" href="/changePassword">Change password</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="/report">Report to admin</a></li>
                    <li><hr className="dropdown-divider"></hr></li>

                    <form action="/logout?_method=DELETE" method="POST">
                        <button type="submit" className="dropdown-item">Log out</button>
                    </form>
                </ul>
            </li>
        </div>
*/
