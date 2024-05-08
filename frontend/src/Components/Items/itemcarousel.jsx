import React from 'react';
import './items.css';

export default function ItemCarousel({ images,sethoverIndex,hoverIndex}) {

  return (
    <div className="item-carousel">
      <div className="carousel-inner">


      <div className="alert-custom alert badge bg-secondary" role="alert">
  <strong>
    <span>sale</span>
  </strong>
</div>


        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === hoverIndex ? 'active' : ''}`}
            onMouseEnter={() => sethoverIndex(1)}
            onMouseLeave={() => sethoverIndex(0)}
          >
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ maxHeight: '180px', objectFit: 'contain', width: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
