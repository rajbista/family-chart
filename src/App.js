import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import FamilyChart from "./FamilyChart";

const d = {
  id: 1,
  name: "Aurthor H",
  children: [
    { id: 2, name: "Susan James", relation: "Spouse", imageUrl: "" },
    {
      id: 3,
      name: "John Paris Brandon",
      relation: "Son",
      children: [{ id: 4, name: "Taylor Swift", relation: "Daughter" }],
    },
  ],
};

function getFlattenedData(dataHierarchy) {
  const descendants = d3.hierarchy(dataHierarchy).descendants();

  descendants.forEach((d, i) => {
    d.id = d.id || "id" + i;
  });

  return descendants
    .map((d, i) => [d.parent?.data?.id, d.data])
    .map(([parentId, data]) => {
      const copy = { ...data };
      delete copy.children;
      return { ...copy, ...{ parentId } };
    });
}

function App() {
  const [data, setData] = useState(getFlattenedData(d));
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: "new Node",
      parentNodeId: "O-6066",
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    // console.log("d3", d3.event);
    // alert("clicked " + nodeId);
  }

  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((data) => {
      setData(data);
    });
  });

  return (
    <FamilyChart
      setClick={(click) => (addNodeChildFunc = click)}
      onNodeClick={onNodeClick}
      data={data}
    />
  );
}

export default App;
