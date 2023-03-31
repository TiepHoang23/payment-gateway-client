import React from 'react';
// import NumericFormat from 'react-numeric-format';

const CartItem = ({ item }) => {
  return (
    <li className='list-group-item cart-item'>
      <div className='row'>
        <div className='container col-8 col-lg-3 d-flex flex-column'>
          <h5 className='m-1'>{item.name}</h5>
          <p className='ps-3 m-1 text-secondary'>Price: {item.price} USD</p>
          <p className='ps-3 m-1 text-secondary'>Quantity: {item.quantity}</p>
          <p className='m-1' style={{ fontWeight: 'bold' }}>
            Total: {item.price * item.quantity} USD
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
