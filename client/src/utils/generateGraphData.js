export const generateGraphData = (
  node,
  parentId = null,
  depth = 0,
  index = 0
) => {
  const nodes = [];
  const edges = [];

  const nodeId = node.path;

  const currentNode = {
    id: nodeId,
    position: { x: depth * 10, y: index * 20 },
    data: { label: node.name },
  };
  if (parentId) {
    currentNode.parentId = parentId;
    edges.push({
      id: `e${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: "straight",
    });
  }

  nodes.push(currentNode);
  console.log(nodes, edges);
  return { nodes, edges };
};
