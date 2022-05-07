import { React } from "react"
import '../Styles/Products.css'
import { Link } from "react-router-dom"
import CartItem from "./cartItem";
import { Component } from "react";
export class Cart extends Component {

  constructor(){
    super()
    this.state = {
      cart: []
    }
  }
 
  componentDidMount = () => {
    fetch('http://localhost:3001/cart')
     .then(resp => resp.json())
     .then(data => {
       this.setState({cart: data})
       console.log(this.state.cart)
     })
     .catch(err => console.log({code: 400, reason:err}))
    }

  render() {

    if (this.state.cart.length) {
      return (
        <div>
          <div className="Products">
            {
              this.state.cart.map((product) => (
                <CartItem key={product._id} product={product.items} onAdd={this.props.onAdd} onRemove={this.props.onRemove} total={product.total}></CartItem>
              ))}
          </div>
            <footer> <h4>Total: {this.props.total}</h4></footer>
            <Link to="/orders"><button className="Order" onClick={this.props.addToOrders}>Place Order</button></Link>
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
