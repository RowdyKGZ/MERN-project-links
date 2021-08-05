import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  // используем контекс авторизации
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Для отправки сообщения при регистарции
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // для активных интуптов email password
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  // изменение по атрибуту name значение
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // регистрация
  const registerHandler = async () => {
    try {
      const data = await request(`/api/auth/register`, "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };

  // логин
  const loginHandler = async () => {
    try {
      const data = await request(`/api/auth/login`, "POST", { ...form });
      auth.logIn(data.token, data.userId);
    } catch (error) {}
  };

  return (
    // Верстка компонента авторизации на materializecss
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 style={{ fontSize: "2.2rem" }}>Сокрашение ссылок</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>

            {/* Теги инпутов email*/}
            <div className="input-field">
              <input
                placeholder="Введите емайл"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            {/* Пароль */}
            <div className="input-field">
              <input
                placeholder="Введите пароль"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>

          {/* Кнопки для входа и регистрации */}
          <div className="card-action">
            <button
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
