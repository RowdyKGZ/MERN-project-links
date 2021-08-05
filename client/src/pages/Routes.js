import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./LinksPage";
import { CreatePage } from "./CreatePage";
import { DetailPage } from "./DetailPage";
import { AuthPage } from "./AuthPage";

export const useRoutes = (isAuth) => {
  // Routes для авторизованного пользователя
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/links" component>
          <LinksPage />
        </Route>
        <Route exact path="/create" component>
          <CreatePage />
        </Route>
        <Route path="/detail/:id" component>
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    // Routes для не авторизованного пользователя
    <Switch>
      <Route exact path="/" component>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
