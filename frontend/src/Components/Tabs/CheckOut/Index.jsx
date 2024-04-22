import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './index.css';

export default function Checkout({ cartItems,removeAllFromCart }) {
  const { price } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      products: cartItems.map((item) => ({
        itemId: item.id,
        itemName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      user: { name, email, address },
      totalPrice: parseInt(price) 
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      
      if (response.status === 201) {
        alert('Order placed successfully');
        removeAllFromCart();
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order');
    }
  };
  
  
  return (
    <div className="order-form">
      <h2 style={{textAlign:'center', marginBottom: "20px "}}>Order Details</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="user-details">
          <h3>User Details</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <label>Total Price:</label>
            <span className="total-price">{price}</span>
          </div>
        </div>
        <div className="item-details">
          <h3>Item Details</h3>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
          
        <button type="submit" className="submit-button">Place Order</button>
        </div>
      </form>
    </div>
  );
}
