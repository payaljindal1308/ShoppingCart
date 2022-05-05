import fetch from 'cross-fetch';
import './App.css';
import { Cart } from './Components/Cart';
import { Products } from './Components/Products';
import { Orders } from './Components/Orders';
import { Link, Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import { NavBar } from './Components/NavBar';
import SpecificProduct from './Components/SpecificProduct';
class App extends Component {
  constructor(){
    super()
    this.state = {
      cartItems: [],
      items: [],
      total: 0,
      orders: {},
      orderId: 1
    }
  }
   addToOrders = () => {
      fetch('http://localhost:3001/orders', {
        method: 'POST',
        body: JSON.stringify({
          orderId: this.state.orderId,
          items: this.state.cartItems
      })
    });
      this.setState(pre => ({
        orderId: pre.orderId + 1,
        orders: {...pre.orders, [pre.orderId]: [this.state.cartItems, this.state.total]}
      }),() => {
        this.setState(pre => ({
          cartItems: [],
          total: 0
        }))
      })
   }
   onAdd = (product) => {
    const item = this.state.cartItems.find((item) => item.id === product.id);
    const productDB = this.state.items.find((item) => item.id === product.id);
    const price = productDB.price;
    if (item) {
      this.setState(pre => (
        { 
          cartItems: pre.cartItems.map((x) =>
          x.id === product.id ? { ...item, qty: item.qty + 1, price: product.price + price} : x),
          total: pre.total + price

        }))
    }else {
      this.setState(pre => ({
        cartItems: [...pre.cartItems, {...product, qty: 1, price: price}] || [],
        total: pre.total + price
      }))
    }
  }
  onRemove = (product) => {
    const item = this.state.cartItems.find((x) => x.id === product.id);
    const productDB = this.state.items.find((item) => item.id === product.id);
    const price = productDB.price;
    if (item.qty === 1) {
      this.setState(pre => ({
        cartItems: pre.cartItems.filter((x) => x.id !== product.id),
        total: pre.total - price
      }))
    } else {
      this.setState(pre => ({
        cartItems: pre.cartItems.map((x) =>
        x.id === product.id ? { ...item, qty: item.qty - 1, price: item.price - price } : x
      ),
        total: pre.total - price

      }))
    }
  }
  async componentDidMount() {
    try{
    const response = await fetch('http://localhost:3001/items');
    const json = await response.json();
    this.setState({ items: json });
    }
    catch(err){
      console.log({code: 400, reason: "Error: "+err});
    }
  }
  render(){
  return (
    <div>
    <NavBar></NavBar>
    <img src="https://kindkones.com/wp-content/uploads/2019/03/IMG_0111-1200x353.jpg"></img>
    <Routes>
      <Route path="/" element={<Products products={this.state.items} onAdd={this.onAdd}/>}></Route>
      <Route path='/cart' element={<Cart cartItems={this.state.cartItems} onAdd={this.onAdd} onRemove={this.onRemove} total={this.state.total} addToOrders={this.addToOrders}/>}></Route>
      <Route path='/orders' element={<Orders orders={this.state.orders}/>}></Route>
      {this.state.items.map(item => (
        <Route key ={item.id} path={"/"+item.name.split(' ').join('')} element={<SpecificProduct id={item.id} name={item.name} price={item.price}></SpecificProduct>}></Route>
      ))}
      </Routes>
      </div>
  )
}
}
export default App;
