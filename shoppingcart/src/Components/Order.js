import React from 'react';
import '../Styles/Orders.css'
import OrderItem from './OrderItem';
export default function Order(props) {
  const { id, order, total } = props;
  return (
        <div className="Orders">
        <h2>Order ID: {id}</h2>
          {order.map( (product, index) => (
            <OrderItem key={index} product={product}></OrderItem>
          ))}
          <footer>Total: {total}</footer>
        </div>
    )
}
