import {React, Component} from "react"
import '../Styles/Products.css'
import { Link } from "react-router-dom"

import Product from './Product.js';

export function Products(props) {
  const { products, onAdd, isAdded} = props;
  return (
      <div className="Products">
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd} isAdded={isAdded}></Product>
        ))}
      </div>
  );
}


