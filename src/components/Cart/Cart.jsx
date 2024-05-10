import React from 'react';
import './Cart.css';


const Cart = ({ cart, removeFromCart }) => {
    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cart.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                                <p>{item.title}</p>
                                <p>{item.price} ГРН.</p>
                                <button onClick={() => removeFromCart(index)}>Удалить</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Итого: {cart.reduce((total, item) => total + item.price, 0)} ГРН.</p>
                        <button>Оформить заказ</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;