import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { saveAuthToken } from '../../../shared/auth/auth'; 
import { setAuthenticated } from '../../../store/slice/auth'; 
import './Modal.css';
import { useLoginMutation } from '../../../shared/api/index'; 

const AuthModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({ username, password });
      
      if (data) {
        const { token } = data;
        saveAuthToken(token);
        dispatch(setAuthenticated(true));
        onClose();
      } else {
        console.error('Ошибка при авторизации');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  };

  return (
    <div className="auth-modal">
      <h2 className='auth-title'>Авторизация</h2>
      <p className='auth-text'>Логин <span className='red'>*</span></p>
      <input className='input-auth' type="text" placeholder="Введите логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      <p className='auth-text'>Пароль <span className='red' >*</span></p>
      <input className='input-auth' type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button  className="btn-auth" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Войти'}
      </button>
      <button className="btn-auth" onClick={onClose}>Отмена</button>
    </div>
  );
};

export { AuthModal };

