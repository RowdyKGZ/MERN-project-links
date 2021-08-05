import { useCallback } from "react";

// Хук для сверки правельные ли данные и отправке через материал U-I toast
export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};
