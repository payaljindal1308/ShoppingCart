import { React } from "react"
import '../Styles/Products.css'
import { Link } from "react-router-dom"
import CartItem from "./cartItem";
export function Cart(props) {

  const { cartItems, onAdd, onRemove, total, addToOrders } = props;

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

  if (cartItems.length) {
    console.log("Cart Items are:" + cartItems.length)
    return (
      <div>
        <div className="Products">
          {
            cartItems.map((product) => (
              <CartItem key={product.id} product={product} onAdd={onAdd} onRemove={onRemove}></CartItem>
            ))}
        </div>
        <footer> <h4>Total: {total}</h4>
          <Link to="/orders"><button className="Order" onClick={addToOrders}>Place Order</button></Link></footer>
      </div>
    );
  }
  else {
    return (
      <h2>Cart is Empty!!</h2>
    )
  }
}
