import React from 'react';
import './CheckoutButton.css';
import { useNavigate } from 'react-router-dom';

export default function CheckButton({price}) {
  const navigate = useNavigate();
  const CheckoutNavigation = () => {
    navigate(`/checkout/${price}`);
 }
  return (
    
    <button className="btn btn-primary checkout-button" onClick={CheckoutNavigation}>Checkout</button>
  );
}
