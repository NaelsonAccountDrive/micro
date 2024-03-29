import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Canvas } from 'butterfly-dag';

import mockData from './data';

import './index.css';
import 'butterfly-dag/dist/index.css';
import { data } from 'jquery';

export default function Flow() {
  function buildCanvas() {
    // css里面的类名限制太死了
    let root = document.getElementById('dag-canvas');
    let canvas = new Canvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      zoomGap: 0.001,
      autoResizeRootSize: true, // automatically adapt to the root size, the default is true
      theme: {
        edge: {
          shapeType: 'AdvancedBezier',
          arrow: true
        }
      }
    });
    canvas.draw(mockData, () => {

    });

    return canvas;
  }

  const [count, setCount] = useState(0);

  setInterval(() => {
    console.log(count.getDataMap())
  }, 5000)
  useEffect(() => {

    setCount(buildCanvas())
  }, []);

  return (
    <div className='flow-page'>
      <button onClick={true}>Ola</button>
      <div className="flow-canvas" id="dag-canvas">
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Flow />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
