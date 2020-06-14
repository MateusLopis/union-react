  
import React from "react";
import { Switch, Route, Redirect } from "react-router";

import App from "./App";
import Login from "./Login";
import Final from "./Final";

export default props => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/enquete" component={App} />
    <Route exact path="/agradecimento" component={Final} />
    <Redirect from="*" to="/" />
  </Switch>
);
