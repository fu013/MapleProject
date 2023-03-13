import React, { memo, useEffect, useRef, useState } from 'react';
import {useBoard} from "./useBoard";

let xHalfLength;
let yHalfLength;
let xLine;
let yLine;
const critical = new Array();
const mpa = new Array();
const Board = () => {
    const [display, score, onKeyDown] = useBoard();
    const eBoard = useRef();
    xHalfLength = Math.ceil(display[0].length / 2); // 20
    yHalfLength = Math.ceil(display.length / 2); // 22
    /* 0, 0~10
    1, 1~10
    2, 2~10
    x좌표, x~yHalf 까지의 배열 : 크리티컬데미지 */
    for(let i = 0; i <= yHalfLength - 6; i++) { // x좌표
        for(let j = i; j <= yHalfLength - 1; j++) { // y좌표
            critical.push(i + ',' + j);
        }
    }
    for(let i = 5; i <= yHalfLength - 1; i++) { // x좌표
        for(let j = i; j <= yHalfLength - 1; j++) { // y좌표
            mpa.push(i + ',' + j);
        }
    }

    // 공간채우기 알고리즘
    // 1. 벽면 혹은 도형과 제일 접촉점이 많은 애들을 우선순위로 배치 // 우선순위는 도형 > 벽면
/* 
    x 4
    y 6
 
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ

    ㅁㅁㅁㅁ
    
    ㅁㅁㅁㅁ
    ㅁㅁㅁㅁ 
   
    2 ~ 4
    
    x1 yyyy4
    xx yy */

    // 배열을 여러개만들어서 공식을 대입
    xLine = 0;
    yLine = 0;
    useEffect(() => {
        focusBoard();
    }, []);

    function focusBoard() {
        eBoard.current.focus();
    }
    return (
        <div ref={eBoard} className={'t-board'} tabIndex={0} onKeyDown={ onKeyDown }>
            {display.map( (row, index) => <Row row={row} key={index} yAxis={index} xLine={xLine} yLine={yLine} />)}
        </div>
    );
};

const Row = memo( props => {
    return (
        <div>
        {
            props.yAxis === yHalfLength
            ? <span className='t-row active'> {props.row.map( (cell, index) => <Cell cell={cell} key={index} xAxis={index} yAxis={props.yAxis} xLine={xLine} yLine={yLine}/>)} </span>
            : (
                <span className='t-row'>
                    {props.row.map( (cell, index) => <Cell cell={cell} key={index} xAxis={index} yAxis={props.yAxis} xLine={xLine} yLine={yLine}/>)}
                </span>
            )
        }
        </div>
    );
});
const Cell = memo( props => {
    const count = useRef(0);

    count.current++;
    
    const value = props.cell ? props.cell : 0;

    let line = "";
    let cri = "";
    let mp = "";
    
    if((props.xLine == props.xAxis && props.yLine == props.yAxis) && props.xLine < yHalfLength) {
        xLine++;
        yLine++;
        line = "liner";
    } else {
        line = "";
    }   
    console.log(mp);
    if(critical.includes(props.xAxis+","+props.yAxis) == true) {
        cri = "cri";
    }
    if(mpa.includes(props.xAxis+","+props.yAxis) == true) {
        mp = "mp";
    }

    function Component() {
        return <span className={`t-cell t-cell-${value} x-${props.xAxis} y-${props.yAxis} xReal-${props.xLine} yReal-${props.yLine} ${line} ${cri} ${mp}`}>{value}</span>;
    } 

    return (
        <div>
        {
            props.xAxis === xHalfLength
            ? <span className={`t-cell t-cell-${value} x-${props.xAxis} y-${props.yAxis} active`}>{value}</span>
            : (
                <Component />
            )
        }
        </div>
    );
});

export default memo(Board);
