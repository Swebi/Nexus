import { saveAs } from "file-saver";

export const saveLayout = ({ nodes, edges }) => {
  console.log("saving");
  const data = {
    nodes: nodes,
    edges: edges,
  };
  const fileName = "nexusconfig.json";

  // Create a blob of the data
  const fileToSave = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  // Save the file
  saveAs(fileToSave, fileName);
};
