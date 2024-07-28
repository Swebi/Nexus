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
import { RiFlowChart } from "react-icons/ri";
import { IoReturnDownForward } from "react-icons/io5";
import Select from "react-select";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import axios from "axios";
import { initialNodes, initialEdges } from "../data/nodes-edges.js";
import "@xyflow/react/dist/style.css";
import { getLayoutedElements } from "../utils/getLayoutedElements.js";
import { generateGraphData } from "../utils/generateGraphData.js";
import { saveLayout } from "../utils/saveLayout.js";
import { commonFolders } from "../data/commonFolders.js";
const LayoutFlow = () => {
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [initialLayoutApplied, setInitialLayoutApplied] = useState(false);
  const [path, setPath] = useState("/Users/suhayb/code/breve");
  const [ignoreFolders, setIgnoreFolders] = useState(
    '[".node_modules", ".git"]'
  );

  const handleIgnoreChange = (selectedOptions) => {
    setIgnoreFolders(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const [file, setFile] = useState(null);

  const [selectedNode, setSelectedNode] = useState(null);
  const [customText, setCustomText] = useState("");

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleTextChange = (event) => {
    setCustomText(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleTextSubmit = (event) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            ...node.data,
            text: customText,
          },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
    const tempId = selectedNode.id;
    setSelectedNode(selectedNode);
  };

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

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Panel position="top-left" className="flex flex-col gap-3 ">
          <button
            onClick={() => saveLayout({ nodes, edges })}
            className="bg-white rounded-md border p-3 shadow-md"
          >
            <FaDownload className="text-2xl" />
          </button>
          <button
            onClick={() => onLayout("LR")}
            className="bg-white rounded-md border p-3 shadow-md"
          >
            <RiFlowChart className="text-2xl" />
          </button>
        </Panel>

        {initialLayoutApplied ? (
          ""
        ) : (
          <Panel className="flex flex-col justify-center items-center w-screen h-screen">
            <div className=" w-[65vw] h-[75vh] mb-[5vh] flex flex-col gap-6 justify-center items-center border rounded-2xl shadow-2xl bg-gradient-to-br from-white to-[#f4f9ff] ">
              <h1 className="text-7xl font-semibold">Nexus</h1>
              <div className="flex gap-3 justify-start items-center w-1/2">
                <h1 className="text-lg  whitespace-nowrap"> Path</h1>
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
                <Select
                  isMulti
                  name="ignoreFolders"
                  options={commonFolders}
                  className="w-full outline-none"
                  classNamePrefix="select"
                  value={commonFolders.filter((option) =>
                    ignoreFolders.includes(option.value)
                  )}
                  onChange={handleIgnoreChange}
                  placeholder="Select folders to ignore"
                />
              </div>

              <button
                className="text-2xl font-normal border rounded-lg shadow-xl p-2 px-8 bg-white"
                onClick={() => {
                  fetchNodes();
                  setInitialLayoutApplied(true);
                }}
              >
                Generate
              </button>
              <div className="flex items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Import
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  className="hidden"
                  accept=".json"
                />
                <span className="ml-3 text-gray-700">
                  {file ? file.name : ""}
                </span>
                <button
                  className="text-xl  cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold  border rounded-lg shadow-xl py-2.5 px-5"
                  onClick={() => {
                    handleFileUpload();
                    setInitialLayoutApplied(true);
                    fitView();
                  }}
                >
                  <IoReturnDownForward />
                </button>
              </div>
            </div>
          </Panel>
        )}
        {selectedNode && (
          <Panel
            position="top-right"
            className="flex flex-col justify-start items-end gap-3 border p-5 w-[20vw] max-h-[40vh] rounded-xl shadow-lg bg-white"
          >
            <p>{selectedNode.data.label}</p>
            <p>Details: </p>
            <p className="text-right overflow-y-scroll max-h-fit max-w-fit">
              {selectedNode.data.text}
            </p>
          </Panel>
        )}

        {selectedNode && (
          <Panel
            position="bottom-right"
            className="flex flex-col gap-3 m-8 border px-5 py-3 rounded-xl shadow-lg bg-white "
          >
            <button onClick={() => setIsOpen(true)}>Add Details</button>
          </Panel>
        )}
        <Background />
        <Controls />
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center bg-black/70 justify-center p-4">
            <DialogPanel className="max-w-lg flex flex-col h-[60vh] gap-5 border bg-white p-5">
              <div className="flex w-full justify-between">
                <DialogTitle className="font-bold">Add Details</DialogTitle>
                <IoReturnDownForward
                  className="text-xl"
                  onClick={(e) => {
                    handleTextSubmit(e);
                    setCustomText("");
                    setIsOpen(false);
                  }}
                />
              </div>
              <Description>
                Add an explanation or info about the folder/file
              </Description>

              <textarea
                type="text"
                value={customText}
                className="outline-none border p-2 w-full h-full"
                onChange={handleTextChange}
              />
            </DialogPanel>
          </div>
        </Dialog>
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
