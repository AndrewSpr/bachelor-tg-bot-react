import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogin }) => {
    const [tgId, setTgId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tg_id: tgId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    onLogin(data.admin); // Передаем данные администратора в родительский компонент
                    navigate('/admin'); // Перенаправляем на /admin
                }
            })
            .catch(error => console.error('Error logging in:', error));
    };

    return (
        <header>
            <h1>Магазин</h1>
            <div>
                <input
                    type="text"
                    placeholder="Введите ваш Telegram ID"
                    value={tgId}
                    onChange={(e) => setTgId(e.target.value)}
                />
                <button onClick={handleLogin}>Войти</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </header>
    );
};

export default Header;
