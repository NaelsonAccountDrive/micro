import Node from './node';
import Edge from './edge';
import BaseEndpoint from './endpoint';

const mockData = {
  nodes: [
    {
      id: '1',
      label: '1',
      left: 300,
      top: 100,
      Class: Node,
      endpoints: [
        {
          id: 'left',
          orientation: [-1, 0],
          pos: [0, 0.5],
          color: 'system-green',
          Class: BaseEndpoint
        }]
    },
    {
      id: '2',
      label: '2',
      left: 100,
      top: 50,
      Class: Node,
      endpoints: [
        {
          id: 'top',
          orientation: [0, -1],
          pos: [0.5, 0],
          color: 'system-green',
          Class: BaseEndpoint
        },
        {
          id: 'right',
          orientation: [1, 0],
          pos: [0, 0.5],
          color: 'system-green',
          Class: BaseEndpoint
        },
        {
          id: 'left',
          orientation: [-1, 0],
          pos: [0, 0.5],
          color: 'system-green',
          Class: BaseEndpoint
        },
        {
          id: 'botton',
          orientation: [0, 1],
          pos: [0.5, 0],
          color: 'system-green',
          Class: BaseEndpoint
        }]
    }
  ],
  edges: [
    {
      source: 'left',
      target: 'right',
      sourceNode: '1',
      targetNode: '2',
      type: 'endpoint',
      arrow: true,
      label: 'rotate-left',
      arrowPosition: 0.2,
      Class: Edge
    }
  ]
};

export default mockData;