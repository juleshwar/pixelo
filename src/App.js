import { Component } from "react";
import PageHome from "./routes/PageHome";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <main className="bg-gray-100">
        <PageHome />
      </main>
    );
  }
}

export default App;
