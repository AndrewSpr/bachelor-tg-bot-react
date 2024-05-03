import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [selectedType, setSelectedType] = useState('QUESTION');
    const [orderNumber, setOrderNumber] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [message, setMessage] = useState('');
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };
  
    const handleOrderNumberChange = (event) => {
      setOrderNumber(event.target.value);
    };
  
    const handleContactMethodChange = (event) => {
      setContactMethod(event.target.value);
    };
  
    const handleInputChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        type: selectedType,
        orderNumber: orderNumber,
        contactMethod: contactMethod,
        message: message,
      };
  
      console.log('Form submitted:', data);
    };

    return (
        <div className='feedback-form'>
                  <h2>Форма обратной связи</h2>
      <p>У вас возникли какие-то вопросы? Хотите оставить жалобу? Без проблем! Свяжитесь с нами, заполнив поля ниже, и мы обязательно ответим вам!</p>
      <p>Среднее время ожидания ответа: 15 минут</p>

      <div className="type-buttons">
        <label>
          <input type="radio" name="type" value="QUESTION" checked={selectedType === 'QUESTION'} onChange={handleTypeChange} />
          Вопрос
        </label>
        <label>
          <input type="radio" name="type" value="COMPLAINT" checked={selectedType === 'COMPLAINT'} onChange={handleTypeChange} />
          Жалоба
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {selectedType === 'COMPLAINT' && (
          <div className="order-number-field">
            <label htmlFor="orderNumber">Номер заказа:</label>
            <input type="text" id="orderNumber" value={orderNumber} onChange={handleOrderNumberChange} />
          </div>
        )}

        <div className="contact-method-field">
          <label htmlFor="contactMethod">Способ связи:</label>
          <select id="contactMethod" value={contactMethod} onChange={handleContactMethodChange}>
            <option value="">Выберите способ связи</option>
            <option value="email">Email</option>
            <option value="phone">Телефон</option>
            <option value="chat">Чат</option>
          </select>
        </div>

        <div className="message-field">
          <label htmlFor="message">Суть вопроса/жалобы:</label>
          <textarea id="message" value={message} onChange={handleInputChange} />
        </div>

        <button type="submit">Отправить</button>
      </form>
        </div>
    );
};

export default Form;