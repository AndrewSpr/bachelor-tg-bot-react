import React, { useState, useEffect, useCallback } from 'react';
import Cart from '../Cart/Cart'; // Импортируем компонент корзины
import {useTelegram} from '../../Hooks/Telegram';
import Swiper from 'swiper';
import 'swiper/css';
import './ProductList.css';

const {tg} = useTelegram();

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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]); // Состояние корзины

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
  };

    useEffect(() => {
        fetch(`http://localhost:3001/products`)
          .then(response => response.json())
          .then(data => {
            const uniqueCategories = [...new Set(data.map(product => product.category))];
            setCategories(uniqueCategories);
            setProducts(data);
          })
          .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/products${selectedCategory ? `?category=${selectedCategory}` : ''}`)
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

        useEffect(() => {
          if (cart.length > 0) {
              tg.MainButton.show();
          } else {
              tg.MainButton.hide();
          }
      }, [cart]);

      const onShowCart = useCallback(() => {
        return <Cart cart={cart} removeFromCart={removeFromCart} />
      }, [cart])

      useEffect( () => {
          tg.onEvent('mainButtonClicked', onShowCart)
        return () => {
          tg.offEvent('mainButtonClicked', onShowCart)
        }
      }, [onShowCart])

      useEffect( () => {
        tg.MainButton.setParams( {
          text: `Перейти к корзине (${cart.length})`
        })
      }, [cart])

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
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Все товары</option>
              {categories.map(category => (
              <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="product-list">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <img src='./images/pizza.png' alt='#' />
                <div className="product-card__title">{product.title}</div>
                <div className="product-card__sub-title">{product.subtitle}</div>
                <div className="product-card__footer">
                  <div className="product-card__price">{product.price} ГРН.</div>
                  <button onClick={() => addToCart(product)}>ДО КОШИКА</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default ProductList;