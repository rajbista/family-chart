import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";

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

const NodeContent = (d) => {
  const color = "#FFFFFF";
  return `
    <div
      style="font-family: 'Inter', sans-serif; background-color:${color}; position:absolute; width:${
    d.width
  }px; height:${d.height}px; border-radius:10px; border: 2px solid #E4E2E9"
    >
      ${d.data.imageUrl ?
   `<div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
      <img
        src=" ${
         d.data.imageUrl
       } "
        style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;"
      />` : ''
    }

      <div style="color:#08011E; position:absolute; right:20px; top:17px; font-size:10px;">
        <i class="fas fa-ellipsis-h"></i>
      </div>

      <div style="font-size:16px; color:#08011E; margin-left:10px; margin-top:22px">
        ${d.data.name}
      </div>
     
      ${
        d.data?.relation ?
        `<div style="color:#716E7B; margin-left:10px; margin-top:3px; font-size:12px;">
        ${d.data.relation}
      </div>`
        : ''
      }
    </div>
  `
  ;
};


export default function FamilyChart(props, ref) {
  const [data, setData] = useState(getFlattenedData(d));

  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart());

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (data && d3Container.current) {
      chartRef.current
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d) => 160)
        .nodeHeight((d) => 80)
        .childrenMargin((d) => 100)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 200)
        .siblingsMargin((d) => 25)
        .onNodeClick((d, i, arr) => {
          console.log("Id of clicked node ", d);
          props.onNodeClick(d);
        })

        .nodeContent((d) => {
          return NodeContent(d);
        })
        .render();
    }
  }, [data, props, d3Container]);

  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((data) => {
      setData(data);
    });
  });

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
}
