import React, { useState, useEffect } from "react";
import "resources/css/union.css";
import { randomShape } from "./shapeFactory";

function User() {
    const [shape1, set1Shape] = useState(()=> randomShape() );
    const [shape2, set2Shape] = useState(()=> randomShape() );
    const [shape3, set3Shape] = useState(()=> randomShape() );
    const [shape4, set4Shape] = useState(()=> randomShape() );
    const [shape5, set5Shape] = useState(()=> randomShape() );
    let div = "";
    shape1.shape.map((location, count) => {
        div += location['x'] + ',' + location['y'] + "/";
    });
    const style1 = {
        width: shape1.width * 50,
        height: shape1.height * 50,
        border: "1px solid #ccc",
    }
    const style2 = {
        width: shape2.width * 50,
        height: shape2.height * 50,
        border: "1px solid #ccc",
    }
    const style3 = {
        width: shape3.width * 50,
        height: shape3.height * 50,
        border: "1px solid #ccc",
    }
    const style4 = {
        width: shape4.width * 50,
        height: shape4.height * 50,
        border: "1px solid #ccc",
    }
    const style5 = {
        width: shape5.width * 50,
        height: shape5.height * 50,
        border: "1px solid #ccc",
    }
    return (
        <div id="shape-container">
            <div style={style1}>
                {div}
            </div>
            <div style={style2}>
            </div>
            <div style={style3}>
            </div>
            <div style={style4}>
            </div>
            <div style={style5}>
            </div>
        </div>
    );
}

export default User;
