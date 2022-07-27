/*
 * @Date: 2022-07-26 17:19:13
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-27 18:58:08
 * @FilePath: \x6-in-react\pages\demo3\index.js
 * @desc: 自定义react组件渲染节点(3000个节点优化渲染)
 */
import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import MyComponent from '../component/MyComponent'

const UNIQ_GRAPH_ID = 'UNIQ_GRAPH_ID' // 任意字符串，作为画布的唯一标识。注意：任意两张同时渲染的画布需要有不同的标识

export default function () {
  const [Portal, setGraph] = usePortal(UNIQ_GRAPH_ID)
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

  // 多节点挂载测试(num)
  let nodes = []
  let edges = []
  const num = 3000
  for (let i = 0; i < num; i++) {
    nodes[i] = {
      id: `node${i + 1}`, // String，可选，节点的唯一标识
      x: 40 + i,       // Number，必选，节点位置的 x 值
      y: 40 + i,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'react-shape',
      component: <MyComponent text="Helloo" />,
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
      setGraph(graph) // 在添加节点前，先将生成的 Graph 实例传入 setGrah
    }
    // graph.fromJSON(data)
    // graph.addNode(data)
    const nodes = data.nodes.map(dataItem => {
      return new ReactShape({
        view: UNIQ_GRAPH_ID, // 需要指定 view 属性为定义的标识
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
    // 批量添加一组节点以提升挂载性能
    graph.addCell(nodes)
    graph.addCell(edges)
    // console.log(nodes, edges, 'edges---3');
    // graph.addCell(edges)
  }, [setGraph])

  return (
    <div ref={ref}>
      <Portal />
    </div>
  );
}
