  
import React from "react";
import { Switch, Route, Redirect } from "react-router";

import App from "./App";
import Login from "./Login"

export default props => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/acesso" component={Login} />
    <Redirect from="*" to="/" />
  </Switch>
);
