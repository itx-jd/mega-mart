import  { useEffect, useState } from 'react';
import './items.css';
import ItemCard from './itemCard';

export default function Index(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        console.log(props.SearchItem);
        if (props.SearchItem) {
          const response = await fetch(
            `http://localhost:3001/api/products/search?itemName=${props.SearchItem}`
          );
          const data = await response.json();
          setProducts(data.products);
          console.log(data.products);
          return;
        }
        const response = await fetch('http://localhost:3001/api/products');
        const data = await response.json();
       
        setProducts(data.products); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getdata();
  }, [props.SearchItem]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div className="col mb-4" key={product._id}>
            
            <ItemCard
            productId={product._id}
              itemName={product.itemName}
              price={product.price}
              images={product.images}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
