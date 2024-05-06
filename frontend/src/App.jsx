// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/nav";
import Items from "./Components/Items/index";
import Product from "./Components/Items/Product/product";
import Cart from "./Components/Tabs/cartComponents/cart";
import Checkout from "./Components/Tabs/CheckOut/Index";
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';

function InnerApp({ isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      {isAuthenticated && <Navbar />}
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Items /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/checkout/:price" element={<Checkout />} />
          <Route path="/signup" element={!isAuthenticated ? <SignupForm /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
      {isAuthenticated && <Cart />}
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