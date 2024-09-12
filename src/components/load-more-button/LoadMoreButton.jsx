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
        'https://dummyjson.com/products?limit=10&skip=10'
      );
      if (!response.ok) {
        throw new Error(`HTTP error ! ${response.status}`);
      }
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

  return <div className='container'>LoadMoreButton</div>;
};
