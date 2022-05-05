import React from 'react';
import '../Styles/Orders.css'
export default function OrderItem(props) {
  const { product } = props;
  return (
    <div className='orderwrapper'>
    <div><img className="logo" src={'https://i.pinimg.com/564x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg'} alt={product.name} />
      <img className='bestseller' src={"https://previews.123rf.com/images/houbacze/houbacze1806/houbacze180600012/102546546-banner-best-seller.jpg"}/></div>
      <div>{product.name}</div>
      <div>Rs.{product.price}</div>
      <div>
        <button>{product.qty}</button>
      </div>
    </div>
  );
}
