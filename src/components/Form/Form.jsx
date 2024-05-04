import React, { useEffect, useState, useCallback } from 'react';
import {useTelegram} from '../../Hooks/Telegram';
import './Form.css';

const Form = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [contactType, setContactType] = useState('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [telegramNickname, setTelegramNickname] = useState('');
    const [feedbackType, setFeedbackType] = useState('complaint');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
      if (!name || (contactType === 'phone' && !phoneNumberIsValid()) || (contactType === 'telegram' && !telegramNicknameIsValid())) {
        alert('Будь-ласка, заповніть всі обов\'язкові поля коректно');
        return;
      }
    
      const data = {
        name,
        orderNumber,
        contactType,
        phoneNumber,
        telegramNickname,
        feedbackType
      }
      tg.sendData(JSON.stringify(data));
    }, [name, orderNumber, contactType, phoneNumber, telegramNickname, feedbackType])
    
    const phoneNumberIsValid = () => {
      const phoneNumberRegex = /^\+380\d{9}$/;
      return phoneNumberRegex.test(phoneNumber);
    }
    
    const telegramNicknameIsValid = () => {
      const telegramNicknameRegex = /^@[\w\d_]{5,}$/;
      return telegramNicknameRegex.test(telegramNickname);
    }

    useEffect( () => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
        tg.offEvent('mainButtonClicked', onSendData)
      }
    }, [onSendData])

    useEffect( () => {
      tg.MainButton.setParams( {
        text: 'Отправить'
      })
    }, [])

    useEffect( () => {
      if(!name) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    }, [name])
  
    return (
      <div className='feedback-body'>
        <span className='feedback-title'>У вас виникли якісь питання? Бажаєте залишити скаргу? Без проблем! Зв'яжіться з нами, заповнивши нижче поля, і ми обов'язково відповімо вам!
        <br/>
        <br/>
        <b>Середній час очікування відповіді – 15 хвилин</b></span>
  
        <div className="feedback-type-buttons">
          <button
            type="button"
            className={feedbackType === 'question' ? '_active' : ''}
            onClick={() => setFeedbackType('question')}
          >
            ПИТАННЯ
          </button>
          <button
            type="button"
            className={feedbackType === 'complaint' ? '_active' : ''}
            onClick={() => setFeedbackType('complaint')}
          >
            СКАРГА
          </button>
        </div>
  
        <form className='feedback-form'>
          <div className="form-group">
            <label htmlFor="orderNumber">Номер замовлення:</label>
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
              <label htmlFor="name">Як нам до Вас звертатись?</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          <div className="form-group">
            <label htmlFor="contactType">Спосіб зв'язку:</label>
            <select
              id="contactType"
              name="contactType"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
            >
              <option value="phone">Номер телефону</option>
              <option value="telegram">Telegram чат</option>
            </select>
          </div>
  
          {contactType === 'phone' && (
            <div className="form-group">
              <label htmlFor="phoneNumber">Номер телефону:</label>
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
          {contactType === 'telegram' && (
            <div className="form-group">
              <label htmlFor="telegramNickname">Ваше имя пользователя: @</label>
              <input
                type="text"
                id="telegramNickname"
                name="telegramNickname"
                value={telegramNickname}
                onChange={(e) => setTelegramNickname(e.target.value)}
                required
              />
            </div>
          )}
          </form>
        </div>
      );
};

export default Form;