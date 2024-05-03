import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [contactType, setContactType] = useState('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [feedbackType, setFeedbackType] = useState('complaint'); // 'question' или 'complaint'
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        orderNumber,
        contactType,
        phoneNumber,
        message,
        feedbackType,
      };
  
      // Отправить данные на сервер (API)
      axios.post('/feedback', data)
        .then(response => {
          console.log('Форма успешно отправлена!');
          // Очистить форму
          setOrderNumber('');
          setContactType('phone');
          setPhoneNumber('');
          setMessage('');
        })
        .catch(error => {
          console.error('Ошибка отправки формы:', error);
        });
    };
  
    const handleFeedbackTypeChange = (e) => {
      setFeedbackType(e.target.value);
    };
  
    return (
      <div className='feedback-body'>
        <h2>Обратная связь</h2>
  
        <div className="feedback-type-buttons">
          <button
            type="button"
            className={feedbackType === 'question' ? '_active' : ''}
            onClick={() => setFeedbackType('question')}
          >
            ВОПРОС
          </button>
          <button
            type="button"
            className={feedbackType === 'complaint' ? '_active' : ''}
            onClick={() => setFeedbackType('complaint')}
          >
            ЖАЛОБА
          </button>
        </div>
  
        <form className='feedback-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="orderNumber">Номер заказа:</label>
            <select
              id="orderNumber"
              name="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              disabled={feedbackType === 'question'}
              required={feedbackType === 'complaint'}
            >
              {/* Заполнить данными из базы данных mySQL */}
            </select>
          </div>
  
          <div className="form-group">
            <label htmlFor="contactType">Способ связи:</label>
            <select
              id="contactType"
              name="contactType"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
            >
              <option value="phone">Номер телефона</option>
              <option value="telegram">Telegram чат</option>
            </select>
          </div>
  
          {contactType === 'phone' && (
            <div className="form-group">
              <label htmlFor="phoneNumber">Номер телефона:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          )}
  
          <div className="form-group">
            <label htmlFor="message">{feedbackType === 'complaint' ? 'Суть жалобы:' : 'Суть вопроса:'}</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ minHeight: '100px' }}
            />
            </div>
          </form>
        </div>
      );
};

export default Form;