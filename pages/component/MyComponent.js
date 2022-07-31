/*
 * @Date: 2022-07-26 14:11:23
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-31 21:37:07
 * @FilePath: /x6-in-react/pages/component/MyComponent.js
 */
import React, {useEffect, useState} from 'react'
import { Timeline } from 'antd'
import 'antd/es/timeline/style/css'
import styles from './index.css'
import EditComponent from './EditComponent'
import { usePortal, ReactShape } from '@antv/x6-react-shape'
// import flowGraph from '../Graph/index'

export default function({ text = '123', node, onShow }) {
  const [isVisible, setIsVisible] = useState(false);
  let { store: {data: {busData}} } = node
  console.log(node, 'node---1');
  const handleClick = () => {
    // const graph = FlowGraph.addNode()
    // console.log(graph, FlowGraph, 'graph---2');
    // console.log(busData.age, 'dom1----2') 
    // onShow(busData)
    // // setIsVisible(true)
    // let data = {
    //   // 节点
    //   nodes: [
    //     {
    //       id: 'node4', // String，可选，节点的唯一标识
    //       x: 40,       // Number，必选，节点位置的 x 值
    //       y: 40,       // Number，必选，节点位置的 y 值
    //       width: 80,   // Number，可选，节点大小的 width 值
    //       height: 40,  // Number，可选，节点大小的 height 值
    //       label: 'hello', // String，节点标签
    //       shape: 'react-shape',
    //       busData: {name: 'new', age: 18},
    //       component: 'my-component1',
    //     },
    //     {
    //       id: 'node5', // String，节点的唯一标识
    //       x: 160,      // Number，必选，节点位置的 x 值
    //       y: 180,      // Number，必选，节点位置的 y 值
    //       width: 80,   // Number，可选，节点大小的 width 值
    //       height: 40,  // Number，可选，节点大小的 height 值
    //       label: 'world1', // String，节点标签
    //       shape: 'react-shape',
    //       busData: {name: 'new', age: 18},
    //       component: 'my-component1',
    //     },
    //   ],
    //   // 边
    //   edges: [
    //     {
    //       source: 'node2', // String，必须，起始节点 id
    //       target: 'node4', // String，必须，目标节点 id
    //     },
    //     {
    //       source: 'node2', // String，必须，起始节点 id
    //       target: 'node5', // String，必须，目标节点 id
    //     },
    //   ],
    // };
    let graph = node._model.graph
    console.log(graph, 'graph---1');
    const addNode = graph.addNode
    console.log(addNode(), 'addNode---');
    // // graph.fromJSON(data)
    // const nodes = data.nodes.map(dataItem => {
    //   return new ReactShape({
    //     // view: UNIQ_GRAPH_ID, // 需要指定 view 属性为定义的标识
    //     // component: <MyComponent text="Hoooo" />, // 自定义的 React 节点
    //     // .. 其它配置项
    //     ...dataItem
    //   })
    // })
    // const edges = data.edges.map(dataItem => {
    //   // return new ReactShape({
    //   //   view: UNIQ_GRAPH_ID, // 需要指定 view 属性为定义的标识
    //   //   // component: <MyComponent text="Hoooo" />, // 自定义的 React 节点
    //   //   // .. 其它配置项
    //   //   ...dataItem
    //   // })
    //   return graph.createEdge(dataItem)
    // })
    // // graph.addNode(data.nodes)
    // // graph.addEdge(data.edges)
    // graph.addCell(nodes)
    // graph.addCell(edges)
  }
  const handleEdit = (data) => {
    console.log(data, node, 'handleEdit----2') 
    node.prop('busData', data)
  }
  return (
    <div className={styles.nodeTooltips} onClick={handleClick}>
      <Timeline>
        <Timeline.Item>{busData.name}</Timeline.Item>
        <Timeline.Item>{busData.age}</Timeline.Item>
      </Timeline>
      {isVisible && <EditComponent node={node} />}
    </div>
  )
}

// export default MyComponent
