import * as d3 from "d3";

export const colors = {
  design: "#e76f51",
  programming: "#2a9d8f",
  javascript: "#ffb703",
  framework: "#2a9d8f",
  css: "#F16896",
  databases: "#264653",
  "adobe-suite": "#e63946",
  developer: "lightpink",
  designer: "lightblue",
  other: "blue",
};
export const circleNodes = (node, radius, fill = "#fff") =>
  node
    .append("path")
    .attr("fill", fill)
    .attr("id", (d) => `${d.data?.label}_path`)
    .attr("stroke", (d) => colors[d.data?.techType || "other"])

    .attr(
      "d",
      d3.arc().innerRadius(0).outerRadius(radius).startAngle(0).endAngle(359)
    );

export const imageNodes = (node, size, isCircle = true) => {
  const img_size = size * 0.9;
  node.select("path").attr("stroke-width", 20);
  node
    .append("text")
    .append("textPath") //append a textPath to the text element
    .attr("xlink:href", (d) => `#${d.data.label}_path`) //place the ID of the path here
    .style("text-anchor", "middle") //place the text halfway on the arc
    .attr("startOffset", "50%")
    .text((d) => d.data.name)
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .attr("font-size", "9px")
    .attr("dy", "0.3em");

  node
    .filter((d) => !d.data.rootSkill)
    .append("foreignObject")
    .attr("width", img_size * 2)
    .attr("height", img_size * 2)
    .attr("x", -img_size)
    .attr("y", -img_size)
    .append("xhtml:div")
    .attr("class", "node")
    .html((d) => {
      const { label, icon = "default" } = d.data;
      const angle = Math.ceil((d.x * 180) / Math.PI - 90) * -1;
      const style = isCircle ? `transform: rotate(${angle}deg)` : "";
      return `<img src="icons/${icon}.png" alt="${label}"  style="${style}"/>`;
    });

  return node;
};

export const textNodes = (node) => {
  node
    .append("rect")
    .attr("class", "node--label-bg")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 0 : -100))
    .attr("y", -20)
    .attr("width", 100)
    .attr("height", 40)
    .attr("fill", "white");

  node
    .append("text")
    .attr("class", "node--label")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr("text-anchor", (d) =>
      d.x < Math.PI === !d.children ? "start" : "end"
    )
    .text((d) => d.data.name);
  return node;
};

export const toggleNodes = (node, cb) => {
  node.on("click", (event, d) => {
    let altChildren = d.data.altChildren || [];
    let children = d.data.children;
    d.data.children = altChildren;
    d.data.altChildren = children;
    return cb();
  });
};

export const initTooltip = (nodes) => {
  const tooltip = d3.select("#tooltip");
  nodes
    .on("mouseover", (event, d) =>
      tooltip
        .style("opacity", 1)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 25 + "px")
        .html(d.data ? d.data.name : d.first_name + " " + d.last_name)
    )
    .on("mouseout", (event, d) => tooltip.style("opacity", 0));
};

