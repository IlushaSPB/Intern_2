import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';  // Подключаем файл стилей

function Profile() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    if (token) {
      try {
        const decode = jwtDecode(token);
        const user_id = decode.user_id;
        const username = decode.username;
        const full_name = decode.full_name;
        const image = decode.image;

        // Собираем полный URL к изображению
        const imageUrl = `http://127.0.0.1:8000/media/${image}`;

        // Сохраняем данные пользователя в state
        setUserData({
          user_id,
          username,
          full_name,
          image: imageUrl,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return (
    <div className="dashboard-container"> {/* Добавляем контейнер для стилей */}
      {userData ? (
        // Выводим карточку пользователя, если есть данные
        <div className="user-card">
          <img src={userData.image} alt="User Avatar" className="user-avatar" />
          <div className="user-info">
            <span className="greeting">Hello, {userData.username} {userData.full_name}!</span>
            {/* Дополнительная информация о пользователе */}
            <p className="user-id">User ID: {userData.user_id}</p>
          </div>
        </div>
      ) : (
        // Выводим сообщение об ошибке, если нет токена
        <span className="error-message">Извините, мы вас не знаем.</span>
      )}
    </div>
  );
}

export default Profile;
