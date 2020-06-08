  
import React from "react";
import { Switch, Route, Redirect } from "react-router";

import App from "./App";
import Login from "./Login"

export default props => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/enquete" component={App} />
    <Redirect from="*" to="/" />
  </Switch>
);
