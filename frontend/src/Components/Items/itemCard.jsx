import { useState } from 'react';
import React from 'react';
import ItemCarousel from './itemcarousel';
import { useNavigate } from 'react-router-dom';
import './items.css';

export default function ItemCard(props) {
  const { itemName, price, images, productId,description} = props;
  const [hoverIndex, setHoverIndex] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    const encodedImages = encodeURIComponent(JSON.stringify(images));
    navigate(`/product/${productId}?itemName=${encodeURIComponent(itemName)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}&images=${encodedImages}`);
  };
  
  

  return (
    <div className="card mb-4 h-100" onClick={handleCardClick}>
      <div style={{ height: '200px', overflow: 'auto' }}>
        <ItemCarousel images={images} sethoverIndex={setHoverIndex} hoverIndex={hoverIndex} />
      </div>

      <div className="card-body">
        <p className={hoverIndex ? 'hovered-description' : ''}>
          {itemName.length > 20 ? setdescription(itemName) : itemName}
        </p>
        <div className="d-flex justify-content-center">
          <span className="fw-bold">Rs. {price}</span>
        </div>
      </div>
    </div>
  );
}

const setdescription = (item) => {
  if (item.length > 20) {
    return item.slice(0, 20).concat('...');
  }
  return item;
};
