import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageGameView from "./PageGameView";
import LandingPage from "../components/LandingPage";
import PixeloStateHandler from "../services/PixeloStateHandler";
import PageLoading from "./PageLoading";
import PageDesignDrawing from "./PageDesignDrawing";

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
            {this.state.hasDataLoaded ? <LandingPage /> : <PageLoading />}
          </Route>
          <Route path="/play">
            {this.state.hasDataLoaded ? <PageGameView /> : <PageLoading />}
          </Route>
          <Route path="/design">
            {this.state.hasDataLoaded ? <PageDesignDrawing /> : <PageLoading />}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default PageHome;
