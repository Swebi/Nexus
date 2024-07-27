import React from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
];

const edges = [{ id: "1-2", source: "1", target: "2" }];

function Flow() {
  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1 className="text-9xl">hello</h1>
      <div className="w-[80%] h-[80%]">
        {" "}
        <Flow />
      </div>{" "}
    </div>
  );
};

export default App;
