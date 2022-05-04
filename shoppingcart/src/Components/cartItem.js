import React from 'react';
import '../Styles/Products.css'
export default function CartItem(props) {
  const { product, onAdd, onRemove } = props;
  return (
    <div className='itemwrapper'>
      <div>{product.name}</div>
      <div>Rs.{product.price}</div>
      <div>
        <button onClick={() => onAdd(product)}>+</button>
        <button>{product.qty}</button>
        <button onClick={() => onRemove(product)}>-</button>
      </div>
    </div>
  );
}
