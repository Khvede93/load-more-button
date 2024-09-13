import React, { useEffect, useState } from 'react';
import './loadMoreButton.css';

export const LoadMoreButton = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errorM, setErrorM] = useState('');

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=21&skip=${
          count === 0 ? 0 : count * 21
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error ! ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data.products || !data.products.length) {
        throw new Error(`No Products found`);
      }
      setProducts(data.products);
    } catch (e) {
      setErrorM(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading Data ! Please Wait</div>;
  }

  if (errorM !== '') {
    return <div>{errorM}</div>;
  }

  return (
    <div className='container'>
      <section className='products-container'>
        {products && products.length
          ? products.map((product) => (
              <div className='product' key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>{product.title}</h2>
                <button>Buy Now</button>
              </div>
            ))
          : null}
      </section>
      <div>
        <button className='load-more'>Load More</button>
      </div>
    </div>
  );
};
