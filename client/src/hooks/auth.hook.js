import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

// Хук для обработки авторизации
export const useAuth = () => {
  const [token, setToken] = useState(null);
  // хук для того что бы при релоадинге страницы детайл не перекидывала в креате
  const [ready, setReady] = useState(false);

  const [userId, setUserId] = useState(null);

  const logIn = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  // Проверка есть ли в локалстораге юсера
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      logIn(data.token, data.userId);
    }
    setReady(true);
  }, [logIn]);

  return { logIn, logOut, token, userId, ready };
};
