/*
 * @Date: 2022-07-30 16:16:08
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-30 17:58:02
 * @FilePath: /x6-in-react/pages/registerReactComponent.js
 */
import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';
import MyComponent from './component/MyComponent'
const onShow = (val) => {
  console.log(val, 'show--111');
}
Graph.registerReactComponent('my-component1', <MyComponent text="Hello-component" onShow={onShow} />)