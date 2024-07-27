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
import { FaDownload } from "react-icons/fa6";
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

  const [initialLayoutApplied, setInitialLayoutApplied] = useState(false);
  const [path, setPath] = useState("");
  const [ignoreFolders, setIgnoreFolders] = useState("");

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const json = JSON.parse(content);
          if (json.nodes && json.edges) {
            setNodes(json.nodes);
            setEdges(json.edges);
          } else {
            alert("Invalid JSON structure");
          }
        } catch (error) {
          alert("Error parsing JSON");
        }
      };
      reader.readAsText(file);
    }
  };

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
    [nodes, edges, initialLayoutApplied]
  );

  // useEffect(() => {
  //   onLayout("LR");
  // }, [initialLayoutApplied]);

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
            onClick={() => saveLayout({ nodes, edges })}
            className="bg-white rounded-md border p-3 shadow-md"
          >
            <FaDownload />
          </button>
          <button
            onClick={() => onLayout("LR")}
            className="bg-white rounded-md border p-3 shadow-md"
          >
            Layout
          </button>
        </Panel>

        {initialLayoutApplied ? (
          ""
        ) : (
          <Panel className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="w-[65vw] h-[55vh] mb-[5vh] flex flex-col gap-6 justify-center items-center bg-white border rounded-2xl shadow-2xl">
              <h1 className="text-7xl font-semibold">Nexus</h1>
              <div className="flex gap-3 justify-start items-center w-1/2">
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
              <div className="flex gap-3 justify-start items-center w-1/2">
                <h1 className="text-lg  whitespace-nowrap"> Ignore Folders</h1>
                <input
                  type="text"
                  className="border py-2 px-4 text-lg outline-none w-full tracking-wider"
                  placeholder='[".node_modules",".git"]'
                  value={ignoreFolders}
                  onChange={(e) => {
                    setIgnoreFolders(e.target.value);
                  }}
                />
              </div>

              <button
                className="text-2xl font-normal border rounded-lg shadow-xl p-2 px-8"
                onClick={() => {
                  fetchNodes();
                  setInitialLayoutApplied(true);
                }}
              >
                Start
              </button>
              <input type="file" onChange={handleFileChange} accept=".json" />

              <button
                className="text-2xl font-normal border rounded-lg shadow-xl p-2 px-8"
                onClick={() => {
                  handleFileUpload();
                  setInitialLayoutApplied(true);
                  fitView();
                }}
              >
                Upload
              </button>
            </div>
          </Panel>
        )}
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
