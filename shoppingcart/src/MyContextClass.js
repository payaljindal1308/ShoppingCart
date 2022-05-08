import fetch from 'cross-fetch';
import React,{Component} from 'react';
import './App.css';

const MyContext = React.createContext({
  items: [],
  cartItems: [],
  total: 0,
  onAddToCart: () => { },
  onAdd: () => { },
  onRemove: () => { },
  addToOrders: () => {},
  getId: () => {}
});



class MyContextClass extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      cartItems: [],
      total: 0
    }
  }

  addToOrders = () => {
    fetch('http://localhost:3001/addorders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: this.state.cartItems,
        total: this.state.total
      })
    }).then(() => {
      fetch('http://localhost:3001/deletecart', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        this.setState({
          cartItems: [],
          total: 0
        })
      })
    })
  }


  onAddToCart = (product) => {
    const productDB = this.state.items.find(item => item.id === product.id);
    const productCart = this.state.cartItems.find(item => item.id === product.id);
    const price = productDB.price;
    if (!productCart) {
      this.setState(pre => ({
        cartItems: [...pre.cartItems, { ...product, qty: 1, price: price }] || [],
        total: pre.total + price
      }), () => {
        fetch('http://localhost:3001/addtocart', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            name: product.name,
            qty: 1,
            price: price
          })
        })
      })
    }
  }


  onAdd = (product) => {
    const productDB = this.state.items.find((item) => item.id === product.id);
    const price = productDB.price;
    this.setState(pre => (
      {
        cartItems: pre.cartItems.map((x) =>
          x.id === product.id ? { ...product, qty: product.qty + 1, price: product.price + price } : x),
        total: pre.total + price
      }), () => {
        fetch('http://localhost:3001/updatecart', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            price: price
          })
        }
        )
      })
  }

  onRemove = (product) => {
    const item = this.state.cartItems.find((x) => x.id === product.id);
    const productDB = this.state.items.find((item) => item.id === product.id);
    const price = productDB.price;
    if (item.qty === 1) {
      this.setState(pre => ({
        cartItems: pre.cartItems.filter((x) => x.id !== product.id),
        total: pre.total - price
      }), () => {
        fetch('http://localhost:3001/removefromcart', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: { id: product.id, qty: product.qty, price: product.price },
            total: this.state.total
          })
        }
        )
      })
    } else {
      this.setState(pre => ({
        cartItems: pre.cartItems.map((x) =>
          x.id === product.id ? { ...item, qty: item.qty - 1, price: item.price - price } : x
        ),
        total: pre.total - price
      }), () => {
        fetch('http://localhost:3001/removefromcart', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: { id: product.id, qty: product.qty, price: price },
            total: this.state.total
          })
        }
        )
      })
    }
  }



  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3001/items');
      const json = await response.json();
      const cart = await fetch('http://localhost:3001/cart');
      const cartjson = await cart.json();
      this.setState({
        items: json,
        cartItems: cartjson});
    }
    catch (err) {
      console.log({ code: 400, reason: "Error: " + err });
    }
  }

  // getId(){
  //   const id = useParams();
  //   return id;
  // }


  componentDidUpdate (prevProps, prevState) {
    if(prevState.cartItems !== this.state.cartItems) {
      console.log('Different')
    }
  }

  render() {
    return (
      <MyContext.Provider value={{
        items: this.state.items,
        cartItems: this.state.cartItems,
        total: this.state.total,
        onAddToCart: this.onAddToCart,
        onAdd: this.onAdd,
        onRemove: this.onRemove,
        addToOrders: this.addToOrders
      }}>
      {this.props.children}
       
        
      </MyContext.Provider>
      
    )
  }
}
export {MyContext}
export default MyContextClass;
