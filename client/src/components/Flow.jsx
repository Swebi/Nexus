import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Flow() {
  const initialNodes = [
    {
      id: "1",
      type: "input",
      position: { x: 300, y: 50 },
      data: { label: "App" },
    },
    { id: "2", position: { x: 450, y: 200 }, data: { label: "Server" } },
    { id: "3", position: { x: 115, y: 200 }, data: { label: "Client" } },
    { id: "4", position: { x: 25, y: 300 }, data: { label: "Src" } },
    { id: "5", position: { x: 200, y: 300 }, data: { label: "Public" } },
    { id: "6", position: { x: 390, y: 300 }, data: { label: "Utils" } },
    { id: "7", position: { x: 550, y: 300 }, data: { label: "Index.js" } },
    { id: "8", position: { x: 50, y: 400 }, data: { label: "Components" } },
  ];

  const initialEdges = [
    { id: "e12", type: "straight", source: "1", target: "2" },
    { id: "e13", type: "straight", source: "1", target: "3" },
    { id: "e34", type: "straight", source: "3", target: "4" },
    { id: "e35", type: "straight", source: "3", target: "5" },
    { id: "e26", type: "straight", source: "2", target: "6" },
    { id: "e27", type: "straight", source: "2", target: "7" },
    { id: "e48", type: "straight", source: "4", target: "8" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        preventScrolling={false}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Flow;
