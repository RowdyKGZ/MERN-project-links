import { useState, useCallback } from "react";

// useHttp кастомный хук для запросов
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        // Парсинг бади в нормальный вид
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        // отправка запроса
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        // проверка запроса
        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так при запросе");
        }

        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
