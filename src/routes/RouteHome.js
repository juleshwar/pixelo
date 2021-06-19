import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PixeloStateHandler from "../services/PixeloStateHandler";
import PageLoading from "../components/utils/PageLoading";
import RouteDesign from "./RouteDesign";

// Routes
import RouteLanding from "./RouteLanding";
import RoutePlay from "./RoutePlay";
import RouteSettings from "./RouteSettings";

export class RouteHome extends Component {
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
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <RouteLanding />
          </Route>
          <Route path="/play">
            {this.state.hasDataLoaded ? <RoutePlay /> : <PageLoading />}
          </Route>
          <Route path="/settings">
            <RouteSettings />
          </Route>
          <Route path="/design">
            <RouteDesign />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouteHome;
