export const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "node 2" },
    position: { x: 0, y: 100 },
  },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: "straight" },
];
