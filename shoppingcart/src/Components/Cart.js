import { React } from "react"
import '../Styles/Products.css'
import { Link } from "react-router-dom"
import CartItem from "./cartItem";
import { Component } from "react";
export class Cart extends Component {


  // const addToOrders = () => {
  //   fetch('http://localhost:3001/addorders', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       items: cartItems
  //     })
  //   }).then(() => {
  //     props.cartItems = []
  //     props.total = 0
  //   })
  // }
  render() {

    if (this.props.cartItems.length) {
      console.log("Cart Items are:" + this.props.cartItems.length)
      return (
        <div>
          <div className="Products">
            {
              this.props.cartItems.map((product) => (
                <CartItem key={product.id} product={product} onAdd={this.props.onAdd} onRemove={this.props.onRemove}></CartItem>
              ))}
          </div>
          <footer> <h4>Total: {this.props.total}</h4>
            <Link to="/orders"><button className="Order" onClick={this.props.addToOrders}>Place Order</button></Link></footer>
        </div>
      );
    }
    else {
      return (
        <h2>Cart is Empty!!</h2>
      )
    }
  }
}
