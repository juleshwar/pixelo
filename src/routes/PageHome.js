import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageGameView from "./PageGameView";
import LandingPage from "../components/LandingPage";

export class PageHome extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/play">
            <PageGameView />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default PageHome;
