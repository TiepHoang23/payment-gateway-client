import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
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
  );
};

export default CartEmpty;
