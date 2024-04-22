import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.css";

export default function slideShow({images}) {
  return (
    <div className='container'>
        <Carousel>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} style={{ maxHeight: '200px', objectFit: 'contain', width: '100%' }} />
          </div>
        ))}
        </Carousel>
    </div>
  )
}