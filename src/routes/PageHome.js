import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageGameView from "./PageGameView";
import LandingPage from "../components/LandingPage";
import PixeloStateHandler from "../services/PixeloStateHandler";

export class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasDataLoaded: false,
    };
  }
  componentDidMount() {
    this.setState({ hasDataLoaded: false });
    PixeloStateHandler.getDrawings().then((_) => {
      this.setState({ hasDataLoaded: true });
    });
  }
  render() {
    /* TODO: Handle loading state gracefully */
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {this.state.hasDataLoaded ? (
              <LandingPage />
            ) : (
              <div className="grid place-items-center h-screen">
                Data loading...
              </div>
            )}
          </Route>
          <Route path="/play">
            {this.state.hasDataLoaded ? (
              <PageGameView />
            ) : (
              <div className="grid place-items-center h-screen">
                Data loading...
              </div>
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default PageHome;
