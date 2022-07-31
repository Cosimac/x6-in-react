import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';
import MyComponent from '../component/MyComponent'
const onShow = (val) => {
  console.log(val, 'show--111');
}
Graph.registerReactComponent('my-component1', <MyComponent text="Hello-component" onShow={onShow} />)


// export const ports = {
//   groups: {
//     top: {
//       position: 'top',
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: '#2D8CF0',
//           strokeWidth: 1,
//           fill: '#fff',
//           style: {
//             visibility: 'hidden'
//           }
//         }
//       }
//     },
//     bottom: {
//       position: 'bottom',
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: '#2D8CF0',
//           strokeWidth: 1,
//           fill: '#fff',
//           style: {
//             visibility: 'hidden'
//           }
//         }
//       }
//     },
//     left: {
//       position: 'left',
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: '#2D8CF0',
//           strokeWidth: 1,
//           fill: '#fff',
//           style: {
//             visibility: 'hidden'
//           }
//         }
//       }
//     },
//     right: {
//       position: 'right',
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: '#2D8CF0',
//           strokeWidth: 1,
//           fill: '#fff',
//           style: {
//             visibility: 'hidden'
//           }
//         }
//       }
//     }
//   },
//   items: [
//     {
//       group: 'top'
//     },
//     {
//       group: 'bottom'
//     },
//     {
//       group: 'left'
//     },
//     {
//       group: 'right'
//     }
//   ]
// }

// // 注册节点组件
// Graph.registerNode('custom-rect', {
//   inherit: 'rect',
//   width: 30,
//   height: 15,
//   attrs: {
//     body: {
//       strokeWidth: 1
//     }
//   },
//   ports: { ...ports }
// })

// Graph.registerNode('custom-polygon', {
//   inherit: 'polygon',
//   width: 30,
//   height: 15,
//   attrs: {
//     body: {
//       strokeWidth: 1
//     }
//   },
//   ports: { ...ports }
// })

// Graph.registerNode('custom-circle', {
//   inherit: 'circle',
//   width: 24,
//   height: 24,
//   attrs: {
//     body: {
//       strokeWidth: 1
//     }
//   },
//   ports: { ...ports }
// })