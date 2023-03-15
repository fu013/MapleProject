import React from 'react';
import "resources/css/union.css";
import Board from "./board";
import User from "./user";

function Union() {
    return (
        <div id="container">
            <div className="t-parent">
                <Board />
            </div>
            <User />
        </div>
    );
}

export default Union;
