import { Graph, Addon, Shape, FunctionExt } from '@antv/x6'
import './shape'

export default class FlowGraph {
  // constructor(options) {
  //   this.options = options
  // }
  static graph
  static stencil

  static init(options) {
    this.options = options
    console.log(options, 'this.options----1');
    this.graph = new Graph({
      container: options.ref,
      width: 1000,
      height: 800,
      // 网格
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#E7E8EA',
            thickness: 1,
          },
          {
            color: '#CBCED3',
            thickness: 1,
            factor: 5,
          },
        ],
      },
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
        modifiers: 'ctrl',
      },
      // 鼠标滚轮的默认行为是滚动页面
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },
      // 节点连接
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        snap: true, // 自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#000',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      // 高亮
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#D06269',
              stroke: '#D06269',
            },
          },
        },
      },
      resizing: true, // 缩放节点，默认禁用
      rotating: true, // 旋转节点，默认禁用
      // 启动选择节点
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true, // 对齐线
      keyboard: true, // 键盘快捷键，默认禁用
      history: true, // 启动历史记录
      // 小地图，默认禁用
      minimap: {
        enabled: true,
        container: document.getElementById('minimap'),
        width: 198,
        height: 198,
        padding: 10,
      },
      clipboard: true, // 剪切板，默认禁用
    })
    // this.initStencil()
    // this.initShape()
    this.initEvent()
    this.graph.addNode = this.addNode
    return this.graph
  }

  static addNode() {
    return this.graph
  }

  static initStencil() {
    const self = this
    this.stencil = new Addon.Stencil({
      title: 'FlowGraph',
      target: this.graph,
      stencilGraphWidth: 214,
      stencilGraphHeight: document.body.offsetHeight - 96,
      layoutOptions: {
        columns: 4,
        columnWidth: 48,
        rowHeight: 40,
        marginY: 20
      },
      getDropNode(node) {
        const size = node.size()
        const { type } = node.store.data
        const label = self.getLabel(type)
        return node.clone().size(size.width * 4, size.height * 4).attr('label/text', label)
      }
    })

    const stencilContainer = document.querySelector('#stencil')
    if (stencilContainer) {
      stencilContainer.appendChild(this.stencil.container)
    }
  }

  // 给左侧添加
  static initShape() {
    const graph = this.graph

    const r1 = graph.createNode({
      shape: 'custom-rect',
      type: 'rect'
    })
    const r2 = graph.createNode({
      shape: 'custom-rect',
      type: 'rect-radius',
      attrs: {
        body: {
          rx: 4,
          ry: 4
        }
      }
    })
    const r3 = graph.createNode({
      shape: 'custom-polygon',
      type: 'polygon-rhombus',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20'
        }
      }
    })
    const r4 = graph.createNode({
      shape: 'custom-polygon',
      type: 'polygon-rhomboid',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20'
        }
      }
    })
    const r5 = graph.createNode({
      shape: 'custom-circle',
      type: 'circle'
    })

    this.stencil.load([r1, r2, r3, r4, r5])
  }

  // 显示边连接点
  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
  
  // 初始化注册事件
  static initEvent() {
    const graph = this.graph
    const container = document.getElementById('container')

    // 节点鼠标移入
    graph.on('node:mouseenter', FunctionExt.debounce((nodeAttr) => {
      // 显示连接点
      const ports = container.querySelectorAll(
        '.x6-port-body',
      )
      this.showPorts(ports, true)
      
      // 添加删除
      const { node } = nodeAttr
      const { width } = node.store.data.size
      node.addTools({
        name: 'button-remove',
        args: {
          x: 0,
          y: 0,
          offset: { x: width / 2 + 5, y: 20 },
        },
      })
    }), 500)
    // 节点鼠标移出
    graph.on('node:mouseleave', ({ node }) => {
      const ports = container.querySelectorAll(
        '.x6-port-body',
      )
      this.showPorts(ports, false)

      // 移除删除
      node.removeTools()
    })
    // 节点点击
    graph.on('node:click', ({ node }) => {
      this.options.onClick(node)
    })
    // 连接线鼠标移入
    graph.on('edge:mouseenter', ({ edge }) => {
      // 添加删除
      edge.addTools([
        'source-arrowhead',
        'target-arrowhead',
        {
          name: 'button-remove',
          args: {
            distance: -30,
          }
        }
      ])
    })
  }
  
  // 根据 type => label
  static getLabel(type) {
    let label = ''
    
    switch(type) {
      case 'rect':
        label = '矩形节点'
        break
      case 'rect-radius':
        label = '圆角矩形节点'
        break
      case 'polygon-rhombus':
        label = '菱形节点'
        break
      case 'polygon-rhomboid':
        label = '四边形节点'
        break
      case 'circle':
        label = '圆形节点'
        break
    }

    return label
  }
}