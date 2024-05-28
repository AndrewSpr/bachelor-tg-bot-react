import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, isCartActive, onHideCart }) => {
    const cartClassName = `cart${isCartActive ? ' _active' : ''}`;

    return (
        <div className={cartClassName}>
            <h2>Кошик</h2>
            {cart.length === 0 ? (
                <p>Ваш кошик пустий</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-details">
                                <p>{item.title}</p>
                                <p>{item.price} ГРН.</p>
                                <button onClick={() => removeFromCart(index)}>Видалити</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Итого: {cart.reduce((total, item) => total + item.price, 0)} ГРН.</p>
                        <button>Оформити замовлення</button>
                        <button onClick={onHideCart}>Продовжити покупки</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;