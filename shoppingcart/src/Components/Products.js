import {React, Component} from "react"
import '../Styles/Products.css'


import Product from './Product.js';

export class Products extends Component {
  
render(){
  return (
    <div className="Products">
      {this.props.products.map((product) => (
        <Product key={product.id} product={product} onAdd={this.props.onAdd}></Product>
      ))}
    </div>
);
}
}


