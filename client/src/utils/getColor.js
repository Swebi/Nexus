export const getColor = (depth) => {
  // Define a simple color scale
  const colors = [
    "#B3E5FC", // Light cyan
    "#E8F5E9", // Light green
    "#E3F2FD", // Light blue
    "#C8E6C9", // Light mint green
    "#FFF9C4", // Light yellow
    "#FFCDD2", // Light red
    "#FFE0B2", // Light orange

    "#FFEBEE", // Light pink
    "#FBE9E7", // Light peach
    "#FFECB3", // Light amber

    "#F4FF81", // Light lime
    "#DCE775", // Light lime green

    "#E0F2F1", // Light teal
    "#F3E5F5", // Light lavender
    "#F3E5F5", // Light purple
    "#C5CAE9", // Light indigo
  ];
  return colors[depth % colors.length]; // Cycle through colors based on depth
};
