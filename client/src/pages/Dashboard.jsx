import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";

import axios from "axios";
import { initialNodes, initialEdges } from "../data/nodes-edges.js";
import "@xyflow/react/dist/style.css";
import { getLayoutedElements } from "../utils/getLayoutedElements.js";

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const fetchNodes = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/folder/directory-structure`,
        {
          directoryPath: "/Users/suhayb/code/breve",
          ignoreFolders: ["node_modules", ".git"],
        }
      );
      const data = response.data.structure;
      console.log(data);
    } catch (error) {
      console.error(`Failed to fetch URL details: ${error}`);
    }
  };

  const onLayout = useCallback(
    (direction) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right" className="flex gap-2">
          <button
            onClick={() => onLayout("TB")}
            className="border p-2 px-3 rounded-xl"
          >
            vertical layout
          </button>
          <button
            onClick={() => onLayout("LR")}
            className="border p-2 px-3 rounded-xl"
          >
            horizontal layout
          </button>
        </Panel>


        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
