import React from "react";
import { Loader } from "./components/Loader";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./pages/Routes";
import { useAuth } from "./hooks/auth.hook";
import "materialize-css";
import { Navbar } from "./components/Navbar";

const App = () => {
  const { token, logIn, logOut, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  // подключение Routes
  const routes = useRoutes(isAuthenticated);
  // проверка если ready готов то мы не перекидываем в страницу креате с детайл
  return !ready ? (
    <Loader />
  ) : (
    <AuthContext.Provider
      value={{ token, logIn, logOut, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>;
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
