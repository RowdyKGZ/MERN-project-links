import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  // Функция для выхода
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logOutHandler = (e) => {
    e.preventDefault();
    auth.logOut();
    history.push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span class="brand-logo">Сокрашение ссылок</span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logOutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
