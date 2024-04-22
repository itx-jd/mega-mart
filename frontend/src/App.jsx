import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/nav";
import Items from "./Components/Items/index";
import Product from "./Components/Items/Product/product";
import Cart from "./Components/Tabs/cartComponents/cart";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./Components/Tabs/CheckOut/Index";

function InnerApp() {
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
      <Navbar toggleCart={toggleCart} SearchItem={SetSearchItem}/>
      
      <div style={{ marginTop: "100px" }}>
        <Routes>
          {/* {console.log(searchItem)} */}
          <Route path="/" element={<Items SearchItem={searchItem}/>} />
          <Route path="/product/:productId" element={<Product addToCart={addToCart} />} />
          <Route path="/checkout/:price" element={<Checkout cartItems={cartItems} removeAllFromCart={removeAllFromCart} />} />
        </Routes>
      </div>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} removeFromCart={removeFromCart} updateCartQuantity={updateCart} />
    </>
  );
}

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

export default App;