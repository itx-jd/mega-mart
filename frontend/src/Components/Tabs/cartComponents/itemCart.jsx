import React, { useState } from 'react';
import './ItemCart.css';
import Input from '../../Items/Product/Content/input';

export default function ItemCard({ item, removeFromCart, updateCart }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity); 
    updateCart({ ...item, quantity: newQuantity });
  };
  
  
  

  const totalPrice = item.price * quantity;

  return (
    <div className="item-card">
      <div className="item-image">
        <img
          src={item.images.length > 0 ? item.images[0] : ''}
          alt={`Item 1`}
          className="item-img"
        />
      </div>
      <p className="item-name">{item.name}</p>
      <p className="item-price">R&nbsp;S.{item.price}</p>
      <div>
        <Input
          quantity={quantity}
          setQuantity={handleQuantityChange}
          alertStyles=
          {{ position: 'fixed',
          top: 0,
           left: 0,
          width: '100%', 
          color: 'white',
          textAlign: 'center',
          zIndex: 999}}
        />
      </div>
      <p className="item-total-price">Total: RS.{totalPrice}</p>
      <span className="fav-icon">
        <i className="fa-solid fa-x" onClick={handleRemoveItem}></i>
      </span>
    </div>
  );
}
