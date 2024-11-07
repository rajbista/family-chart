import React, { useLayoutEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";

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
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart());

  function addNode(node) {
    chartRef.current.addNode(node);
  }

  props.setClick(addNode);


  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      chartRef.current
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 160)
        .nodeHeight((d) => 80)
        .childrenMargin((d) => 120)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 220)
        .siblingsMargin((d) => 25)
        .onNodeClick((d, i, arr) => {
          console.log("Id of clicked node ", d);
          props.onNodeClick(d);
        })
        // .buttonContent(({ node, state }) => {
        //   console.log('___NODE:', node);
        //   return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
        //     node.children
        //       ? `<i class="fas fa-angle-up"></i>`
        //       : `<i class="fas fa-angle-down"></i>`
        //   }</span> ${node.data._directSubordinates}  </div>`;
        // })

        .nodeContent((d) => {
          return NodeContent(d);
        })
        .render();
    }
  }, [props, d3Container]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
}
