import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" exact element={<RouteLanding />} />
          <Route path="/play" element={this.state.hasDataLoaded ? <RoutePlay /> : <PageLoading />} />
          <Route path="/settings" element={<RouteSettings />} />
          <Route path="/design" element={<RouteDesign />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default RouteHome;
