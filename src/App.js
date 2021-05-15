import { Component } from "react";
import RouteHome from "./routes/RouteHome";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <main className="bg-gray-100 h-screen overflow-hidden">
        <RouteHome />
      </main>
    );
  }
}

export default App;
