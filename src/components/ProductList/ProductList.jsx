import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import './ProductList.css';

const ProductList = () => {

    const slides = [
        {
          image: './images/pizza.png',
          title: 'Замов піцу через Telegram і отримай знижку 25% на наступні 2 позиції',
        },
        {
          image: './images/sushi.png',
          title: 'Замов піцу через Telegram і отримай знижку 25% на наступні 2 позиції',
        },
      ];
    
      useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          slidesPerView: 1.5,
          spaceBetween: 50,
        });

        return () => {
            swiper.destroy();
          };
      }, []);

      const [products, setProducts] = useState([]);

      useEffect(() => {
        fetch('http://localhost:3001/products')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);

      return (
        <div className="container">
          <div className="banner">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {slides.map((slide) => (
                  <div className="swiper-slide" key={slide.image}>
                    <img src={slide.image} alt={slide.title} />
                    <div className="content">
                      <p>{slide.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
          <h1>Product List</h1>
          <div className="product-list">
            {products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.title}</h2>
              <p>{product.subtitle}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
            </div>
            ))}
        </div>
        </div>
          {/* <div className="product-list">
          {products.map(product => (
              <div className="product-card" key={product.id}>
                <img src='./images/pizza.png' alt='#' />
                <div className="product-card__title">{product.title}</div>
                <div className="product-card__sub-title">{product.subtitle}</div>
                <div className="product-card__footer">
                  <div className="product-card__price">{product.price} ГРН.</div>
                  <button>ДО КОШИКА</button>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      );
};
  
  export default ProductList;