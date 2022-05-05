import React from 'react';
import '../Styles/Products.css'
export default function SpecificProduct(props) {
  const { name, price } = props;

  return (
    <div className='itemwrapper'>
      {/*<img src={product.image} alt={product.name} />*/}
      <div>{name}</div>
      <div>Rs.{price}</div>
    </div>
  );
}
