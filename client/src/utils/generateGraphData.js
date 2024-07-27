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
    position: { x: depth * 0, y: index * 0 },
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

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const { nodes: childNodes, edges: childEdges } = generateGraphData(
        child,
        nodeId,
        depth + 1,
        i
      );
      nodes.push(...childNodes);
      edges.push(...childEdges);
    }
  }

  return { nodes, edges };
};
