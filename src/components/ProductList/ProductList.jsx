import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import './ProductList.css';

const ProductList = () => {
    const slides = [
        {
          image: './images/pizza.png',
          title: 'Замов піцу через Telegram',
          subtitle: 'Отримай знижку 25% на наступні 2 позиції',
        },
        {
          image: './images/sushi.png',
          title: 'Замов суші через Telegram',
          subtitle: 'Отримай знижку 25% на наступні 2 позиції',
        },
      ];
    
      useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
          loop: true,
          autoplay: {
            delay: 2000,
          },
          slidesPerView: 1.5,
          spaceBetween: 50,
        });
      }, []);
    
      return (
        <div className="banner">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {slides.map((slide) => (
                <div className="swiper-slide" key={slide.image}>
                  <img src={slide.image} alt={slide.title} />
                  <div className="content">
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};
  
  export default ProductList;