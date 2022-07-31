/*
 * @Date: 2022-07-26 17:19:13
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-31 20:10:17
 * @FilePath: /x6-in-react/pages/demo4/index.js
 * @desc: 自定义react组件渲染节点(3000个节点优化渲染)
 */
import React, { useEffect, useState } from 'react';
import { Graph } from '@antv/x6';
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import MyComponent from '../component/MyComponent'
import FlowGraph from '../Graph'


export default function () {
  const ref = React.useRef(null)
  const [isShow, setIsShow] = useState(false)
  const [drawData, setDrawData] = useState({})
  // let graph = null
  let data = {
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
        busData: {name: 'dom4', age: 1},
        component: 'my-component1',
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world1', // String，节点标签
        shape: 'react-shape',
        busData: {name: 'dom4', age: 2},
        component: 'my-component1',
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

  const handleNodeClick = (node) => {
    console.log(node, 'data---click');
    node.prop('busData', {name: 'edit', age: 789})
    setIsShow(true)
  }


  useEffect(() => {
    const graph = FlowGraph.init({ref: ref.current, onClick: handleNodeClick})
    graph.fromJSON(data)
  }, [])

  return (
    <div>
      {isShow && <span>draw</span>}  
      <div ref={ref}></div>
    </div>
  );
}
