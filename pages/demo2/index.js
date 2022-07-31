/*
 * @Date: 2022-07-26 17:19:13
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-31 17:22:02
 * @FilePath: /x6-in-react/pages/demo2/index.js
 * @desc: 自定义react组件渲染节点(3000节点测试)
 */
import React, { useEffect, useState } from 'react';
import { Graph } from '@antv/x6';
import { Button, Modal } from 'antd';
import { usePortal, ReactShape } from '@antv/x6-react-shape'

import MyComponent from '../component/MyComponent'

export default function () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ref = React.useRef(null)
  let graph = null
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

  let nodes = []
  let edges = []
  const num = 3
  for (let i = 0; i < num; i++) {
    nodes[i] = {
      id: `node${i + 1}`, // String，可选，节点的唯一标识
      x: 40 + i,       // Number，必选，节点位置的 x 值
      y: 40 + i,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'react-shape',
      busData: {name: i, age: i+1},
      component: 'my-component1',
    }
    if (i < num - 1) {
      edges[i] = {
        source: `node${i + 1}`, // String，必须，起始节点 id
        target: `node${i + 2}`, // String，必须，目标节点 id
      }
    }
  }
  data = { nodes, edges }

  console.log(data, 'data---2');
  
  const showModal = () => {
    // setIsModalVisible(true);
    let data = {
      // 节点
      nodes: [
        {
          id: 'node4', // String，可选，节点的唯一标识
          x: 40,       // Number，必选，节点位置的 x 值
          y: 40,       // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: 'hello', // String，节点标签
          shape: 'react-shape',
          busData: {name: 'new', age: 18},
          component: 'my-component1',
        },
        {
          id: 'node5', // String，节点的唯一标识
          x: 160,      // Number，必选，节点位置的 x 值
          y: 180,      // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: 'world1', // String，节点标签
          shape: 'react-shape',
          busData: {name: 'new', age: 18},
          component: 'my-component1',
        },
      ],
      // 边
      edges: [
        {
          source: 'node3', // String，必须，起始节点 id
          target: 'node4', // String，必须，目标节点 id
        },
        {
          source: 'node3', // String，必须，起始节点 id
          target: 'node5', // String，必须，目标节点 id
        },
      ],
    };
    console.log(graph, 'graph---1');
    // graph.fromJSON(data)
    const nodes = data.nodes.map(dataItem => {
      return new ReactShape({
        // view: UNIQ_GRAPH_ID, // 需要指定 view 属性为定义的标识
        // component: <MyComponent text="Hoooo" />, // 自定义的 React 节点
        // .. 其它配置项
        ...dataItem
      })
    })
    const edges = data.edges.map(dataItem => {
      // return new ReactShape({
      //   view: UNIQ_GRAPH_ID, // 需要指定 view 属性为定义的标识
      //   // component: <MyComponent text="Hoooo" />, // 自定义的 React 节点
      //   // .. 其它配置项
      //   ...dataItem
      // })
      return graph.createEdge(dataItem)
    })
    // graph.addNode(data.nodes)
    // graph.addEdge(data.edges)
    graph.addCell(nodes)
    graph.addCell(edges)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <div ref={ref}></div>
    </div>
  );
}
