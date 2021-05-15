import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoutePlay from "./RoutePlay";
import RouteLanding from "./RouteLanding";

export class RouteHome extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <RouteLanding />
          </Route>
          <Route path="/play">
            <RoutePlay />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouteHome;
