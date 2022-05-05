import React from 'react';
import '../Styles/Products.css'
import { Link } from 'react-router-dom';
export default function Product(props) {
  const { product, onAdd } = props;

  return (
    <div className='itemwrapper'>
      <div><img className="logo" src={'https://i.pinimg.com/564x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg'} alt={product.name} />
      <img className='bestseller' src={"https://previews.123rf.com/images/houbacze/houbacze1806/houbacze180600012/102546546-banner-best-seller.jpg"}/></div>
      <div></div><Link to={"/"+product.name.split(' ').join('')}><div>{product.name}</div></Link>
      <div>Rs.{product.price}</div>
      <div>
        <button onClick={() => onAdd(product)
        }>Add</button>
      </div>
    </div>
  );
}
