import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import ItemCard from "./itemCart";
import CheckButton from "../CheckOut/CheckoutButton";

export default function Cart({ isOpen, toggleCart, items, removeFromCart, updateCartQuantity }) {
  const navigate = useNavigate();

  useEffect(() => {
  }, [isOpen, toggleCart]);

  if (!isOpen) {
    return null;
  }

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="cart-backdrop" onClick={toggleCart} />
      <div className="cart-panel">
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                removeFromCart={removeFromCart}
                updateCart={updateCartQuantity}
              />
            ))}
            <hr className="section-divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Total Price: RS.</p>
              <p>{total}</p>
            </div>
            
            <div style={{display:"flex",justifyContent:"space-around"}}>
              <CheckButton price={total}/>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
}