import React from 'react';
import '../Styles/Products.css'
export default function Product(props) {
  const { product, onAdd } = props;

  return (
    <div className='itemwrapper'>
      {/*<img src={product.image} alt={product.name} />*/}
      <div>{product.name}</div>
      <div>Rs.{product.price}</div>
      <div>
        <button onClick={() => onAdd(product)
        }>Add To Cart</button>
      </div>
    </div>
  );
}
