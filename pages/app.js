/*
 * @Date: 2022-07-26 15:57:06
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-31 18:10:09
 * @FilePath: /x6-in-react/pages/app.js
 */
import React from 'react';
import '@antv/x6-react-shape'
// import './registerReactComponent'
import Demo1 from './demo1/index.js'
import Demo2 from './demo2/index.js'
import Demo3 from './demo3/index.js'
import Demo4 from './demo4/index.js'

export default function () {
  return (
    <div>
      {/* <Demo1 /> */}
      {/* <Demo2 /> */}
      {/* <Demo3 /> */}
      <Demo4 />
    </div>
  );
}
