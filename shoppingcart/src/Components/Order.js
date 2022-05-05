import React from 'react';
import '../Styles/Orders.css'
import OrderItem from './OrderItem';
export default function Product(props) {
  const { orderid, order} = props;
  console.log(order)
  return (
        <div className="Orders">
        <header>Order ID: {orderid}</header>
          {order[0].map( (product, index) => (
            <OrderItem key={index} product={product}></OrderItem>
          ))}
          <footer>Total: {order[1]}</footer>
        </div>
    )
}
