import React, { useCallback, useEffect, useState } from "react";
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
import { generateGraphData } from "../utils/generateGraphData.js";
import { saveLayout } from "../utils/saveLayout.js";
const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [path, setPath] = useState("");
  const [ignoreFolders, setIgnoreFolders] = useState("");

  const fetchNodes = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/folder/directory-structure`,
        {
          directoryPath: path,
          ignoreFolders: ignoreFolders,
        }
      );
      const data = response.data.structure;
      const { nodes, edges } = generateGraphData(data);
      setNodes(nodes);
      setEdges(edges);
      fitView;
    } catch (error) {
      console.error(`Failed to fetch URL details: ${error}`);
    }
  };

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  // useEffect(() => {
  //   fetchNodes();
  // }, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right" className="flex gap-3 ">
          <button
            onClick={() => onLayout("TB")}
            className="bg-white rounded-lg border p-1 px-4 shadow-md"
          >
            Vertical
          </button>
          <button
            onClick={() => onLayout("LR")}
            className="bg-white rounded-lg border p-1 px-4 shadow-md"
          >
            Horizontal
          </button>

          <button
            onClick={() => saveLayout({ nodes, edges })}
            className="bg-white rounded-lg border p-1 px-4 shadow-md"
          >
            Save
          </button>
        </Panel>
        <Panel
          position="bottom-right"
          className="flex flex-col gap-4 border bg-white p-4 rounded-lg"
        >
          <div className="flex gap-3 justify-between items-center">
            <h1>Path</h1>
            <input
              type="text"
              className="border py-2 px-4 text-lg outline-none w-full"
              placeholder="/Users/suhayb/code/breve"
              value={path}
              onChange={(e) => {
                setPath(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 justify-between items-center">
            <h1>Ignore Folders</h1>
            <input
              type="text"
              className="border py-2 px-4 text-lg outline-none w-full"
              placeholder='[".node_modules",".git"]'
              value={ignoreFolders}
              onChange={(e) => {
                setIgnoreFolders(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 w-full justify-between items-center">
            <button
              onClick={fetchNodes}
              className="border px-8 p-2 mx-auto rounded-md"
            >
              Fetch
            </button>
          </div>
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
