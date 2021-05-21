import React, { Component } from "react";
import LoadingIcon from "../components/LoadingIcon";

export class PageLoading extends Component {
  render() {
    return (
      <div className="grid h-screen place-items-center place-content-center">
        <LoadingIcon />
        <span className="mt-3">Loading...</span>
      </div>
    );
  }
}

export default PageLoading;
