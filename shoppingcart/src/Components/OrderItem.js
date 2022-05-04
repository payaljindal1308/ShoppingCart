import React from 'react';
import '../Styles/Products.css'
export default function OrderItem(props) {
  const { product } = props;
  return (
    <div className='itemwrapper'>
      <div>{product.name}</div>
      <div>Rs.{product.price}</div>
      <div>
        <button>{product.qty}</button>
      </div>
    </div>
  );
}
