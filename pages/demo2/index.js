/*
 * @Date: 2022-07-26 17:19:13
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-26 18:02:14
 * @FilePath: \x6-in-react\pages\demo2\index.js
 * @desc: 自定义react组件渲染节点
 */
import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';
import MyComponent from '../component/MyComponent'

export default function () {
  const ref = React.useRef(null)
  let graph = null
  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40,       // Number，必选，节点位置的 x 值
        y: 40,       // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
        shape: 'react-shape',
        component: <MyComponent text="Hello1" />,
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world1', // String，节点标签
        shape: 'react-shape',
        component: <MyComponent text="Hello2" />,
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
      },
    ],
  };

  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: ref.current,
        width: 1400,
        height: 1000,
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      });
    }
    graph.fromJSON(data)
    graph.addNode(data)
  }, [])

  return (
    <div ref={ref}></div>
  );
}
