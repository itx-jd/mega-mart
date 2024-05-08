/* eslint-disable react/prop-types */
// App.js
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar/nav";
import Items from "./Components/Items/index";
import Product from "./Components/Items/Product/product";
import Cart from "./Components/Tabs/cartComponents/cart";
import Checkout from "./Components/Tabs/CheckOut/Index";
import LoginForm from './Components/LoginForm';


function InnerApp({ isAuthenticated, setIsAuthenticated }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const [searchItem, SetSearchItem] = useState("");

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);

      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
            : prevItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const updateCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);
  
      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: item.quantity }
            : prevItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  }

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((prevItem) => {
        return prevItem.id !== itemId;
      });
      return updatedItems;
    });
  };
  
  const removeAllFromCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  return (
    <>
      {isAuthenticated && <Navbar toggleCart={toggleCart} setSearchItem={SetSearchItem}/>}
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Items SearchItem={searchItem}/> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/product/:productId" element={<Product addToCart={addToCart} />} />
          <Route path="/checkout/:price" element={<Checkout cartItems={cartItems} removeAllFromCart={removeAllFromCart} />} />
        </Routes>
      </div>
      {isAuthenticated && 
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} removeFromCart={removeFromCart} updateCartQuantity={updateCart} />
      }
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<InnerApp isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
