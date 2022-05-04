import {React, Component} from "react"
import '../Styles/Products.css'
import { Link } from "react-router-dom"
import Order from './Order.js';

export function Orders(props) {
  const { orders } = props;
  console.log(orders)
  console.log(Object.keys(orders))
  return (
      <div className="Products">
        {Object.keys(orders).map((orderid,index) => (
          <Order key={index} orderid={Object.keys(orders)[index]} order= {orders[orderid]}></Order>
        ))}
      </div>
  );
}


