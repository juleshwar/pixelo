import React, { Component } from "react";
import DrawingPanel from "./DrawingPanel";

export class GameView extends Component {
    render() {
        return (
            <>
                <DrawingPanel />
            </>
        );
    }
}

export default GameView;
