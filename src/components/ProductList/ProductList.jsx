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
          <div className="product-list">
            <div className="product-card">
              <img src="./images/sushi.png" alt="#" />
              <div className="product-card__title">Сет "Українська Каліфорнія"</div>
              <div className="product-card__sub-title">Каліфорнія в кунжуті з вугрем, Каліфорнія в ікрі з лососем, Каліфорнія в ікрі з крабом</div>
              <div className="product-card__footer">
                <div className="product-card__price">300 ГРН.</div>
                <button>ДО КОШИКА</button>
              </div>
            </div>
            <div className="product-card">
              <img src="./images/sushi.png" alt="#" />
              <div className="product-card__title">Сет "Українська Каліфорнія"</div>
              <div className="product-card__sub-title">Каліфорнія в кунжуті з вугрем, Каліфорнія в ікрі з лососем, Каліфорнія в ікрі з крабом</div>
              <div className="product-card__footer">
                <div className="product-card__price">300 ГРН.</div>
                <button>ДО КОШИКА</button>
              </div>
            </div>
            <div className="product-card">
              <img src="./images/sushi.png" alt="#" />
              <div className="product-card__title">Сет "Українська Каліфорнія"</div>
              <div className="product-card__sub-title">Каліфорнія в кунжуті з вугрем, Каліфорнія в ікрі з лососем, Каліфорнія в ікрі з крабом</div>
              <div className="product-card__footer">
                <div className="product-card__price">300 ГРН.</div>
                <button>ДО КОШИКА</button>
              </div>
            </div>
          </div>
        </div>
      );
};
  
  export default ProductList;