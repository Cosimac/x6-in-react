/*
 * @Date: 2022-07-26 17:19:13
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-27 14:01:32
 * @FilePath: \x6-in-react\pages\demo1\index.js
 */
import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';

export default function () {
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
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world1', // String，节点标签
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
  const num = 500
  for (let i = 0; i < num; i++) {
    nodes[i] = {
      id: `node${i + 1}`, // String，可选，节点的唯一标识
      x: 40 + i,       // Number，必选，节点位置的 x 值
      y: 40 + i,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: `hello${i + 1}`, // String，节点标签
    }
    if (i < num - 1) {
      edges[i] = {
        source: `node${i + 1}`, // String，必须，起始节点 id
        target: `node${i + 2}`, // String，必须，目标节点 id
      }
    }
  }
  data = { nodes, edges }

  console.log(data, 'data---1');

  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: ref.current,
        width: 1400,
        height: 1000,
      });
    }
    graph.fromJSON(data)
  }, [])

  return (
    <div ref={ref}></div>
  );
}
