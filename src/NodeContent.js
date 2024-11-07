import React from "react";

const NodeContent = ({ node }) => {
  console.log("__________NODE:", node);
  const color = "#FFFFFF";

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: color,
        position: "absolute",
        marginTop: "-1px",
        marginLeft: "-1px",
        width: node.width + "px",
        height: node.height + "px",
        borderRadius: "10px",
        border: "1px solid #E4E2E9",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          position: "absolute",
          marginTop: "-25px",
          marginLeft: "15px",
          borderRadius: "100px",
          width: "50px",
          height: "50px",
        }}
      ></div>
      <img
        src={node.data.imageUrl}
        alt="Node"
        style={{
          position: "absolute",
          marginTop: "-20px",
          marginLeft: "20px",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
        }}
      />

      <div
        style={{
          color: "#08011E",
          position: "absolute",
          right: "20px",
          top: "17px",
          fontSize: "10px",
        }}
      >
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div
        style={{
          fontSize: "15px",
          color: "#08011E",
          marginLeft: "20px",
          marginTop: "32px",
        }}
      >
        {node.data.name}
      </div>
      <div
        style={{
          color: "#716E7B",
          marginLeft: "20px",
          marginTop: "3px",
          fontSize: "10px",
        }}
      >
        {node.data.positionName}
      </div>
    </div>
  );
};

export default NodeContent;

// function (d, i, arr, state) {
//     const color = "#FFFFFF";

//   }
