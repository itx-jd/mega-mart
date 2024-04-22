import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SlideShow from './slideShow/slideShow';
import Input from './Content/input';
import ItemName from './Content/itemName';
import Description from './Content/description';
import Price from './Content/price';
import AddToCartBtn from './Content/addToCartBtn';
import './product.css';

const Product = ({ addToCart }) => {
  
  const { productId } = useParams();
  const location = useLocation();
  const images = JSON.parse(new URLSearchParams(location.search).get('images'));
  const description = new URLSearchParams(location.search).get('description');
  const name = new URLSearchParams(location.search).get('itemName');
  const price = new URLSearchParams(location.search).get('price');
  const [selectedQuantity, setQuantity] = useState(20);

  return (
    <div className="product-container">
      
      <div className="image-container">
        <SlideShow images={images} />
      </div>
      <div className="details-container">
        <ItemName itemName={name} />
        <Input 
        quantity={selectedQuantity} 
        setQuantity={setQuantity}
         alertStyles={{ position: 'fixed',
          top: 0,
           left: 0,
          width: '100%', 
          color: 'white',
          textAlign: 'center',
          zIndex: 999,
          marginTop: '55px'}}
        />
        <Description description={description} />
        <Price price={price} />
        <AddToCartBtn
        id={productId}
          itemName={name}
          price={price}
          selectedQuantity={selectedQuantity}
          addToCart={addToCart}
          images={images}
        />
      </div>
    </div>
  );
};

export default Product;
