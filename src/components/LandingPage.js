import React, { Component } from "react";
import { Link } from "react-router-dom";

export class LandingPage extends Component {
  render() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-7xl">Pixelo</h1>
        <Link to="/play" className="mt-10 text-blue-500">
          click here to play
        </Link>
      </div>
    );
  }
}

export default LandingPage;
