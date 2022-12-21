import * as d3 from "d3";

export const colors = {
  "design": "#e76f51",
  "programming": "#2a9d8f",
  "javascript": "#ffb703",
  "framework": "#2a9d8f",
  "css": "#F16896",
  "databases": "#264653",
  "adobe-suite": "#e63946",
  "developer": "lightpink",
  "designer": "lightblue",
  "other": "blue",
}
export const circleNodes = (node, radius, fill = "#fff", stroke = "none") =>
  node
    .append("path")
    .attr("id", (d) => `${d.name || d.data.label}_path`)
    .attr("fill", fill)
    .attr("stroke", (d) => d.data ? colors[d.data.techType || 'other'] : stroke)

    .attr(
      "d",
      d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(359)
    );

export const imageNodes = (node, radius) => {
  const img_radius = radius * 0.9;
  node.select("path").attr("stroke-width", 18)
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
    .filter((d) => d.data.icon)
    .append("foreignObject")
    .attr("width", img_radius * 2)
    .attr("height", img_radius * 2)
    .attr("x", -img_radius)
    .attr("y", -img_radius)
    .append("xhtml:div")
    .attr("class", "node")
    .html((d) => `<img src="/SkillChart/${d.data.icon}.png" alt="${d.data.label}">`);
  return node
}

export const textNodes = (node) => {
  node
    .append("rect")
    .attr("class", "node--label-bg")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 0 : -100))
    .attr("y", -20)
    .attr("width", 100)
    .attr("height", 40)
    .attr("fill", "white")

  node
    .append("text")
    .attr("class", "node--label")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr("text-anchor", (d) =>
      d.x < Math.PI === !d.children ? "start" : "end"
    )
    .text((d) => d.data.name)
  return node
}

export const toggleNodes = (node, cb) => {
  node.on("click", (event, d) => {
    let altChildren = d.data.altChildren || [];
    let children = d.data.children;
    d.data.children = altChildren;
    d.data.altChildren = children;
    console.log(cb);
    return cb();
  });
}

export const peopleNodes = (node, g) => {
  const peopleWidth = 15

  d3.select('#people-group')?.remove()

  const peopleGroup = g
    .append("g")
    .attr("id", "people-group")

  const peopleData = peopleGroup
    .selectAll("g")
    .data(node)

  const peopleCoords = [{ x: 0, y: 0 }]

  var i = 0;
  var radius = 0;
  const stepBasis = peopleWidth * 2.5
  while (i < node.length) {
    var steps = Math.floor((2 * radius * Math.PI) / stepBasis);
    for (var index = 0; index < steps; index++) {
      const [x, y] = ["cos", "sin"].map((fn) => Math.floor(0 + radius * Math[fn](2 * Math.PI * index / steps)))
      peopleCoords.push({ x, y })
      i++;
      if (i == node)
        break;
    }
    radius = radius + stepBasis;
  }

  const people = peopleData
    .enter()
    .append("g")
    .attr("class", "person")
    .attr("transform", (d, i) => `translate(${peopleCoords[i].x}, ${peopleCoords[i].y})`)

  circleNodes(people, peopleWidth)
    .attr("fill", (d) => colors[d.title] || 'other')

  people
    .append("rect")
    .attr("class", "person-label--bg")
    .attr("x", d => -d.name.length * 1.5)
    .attr("y", -10)
    .attr("width", d => d.name.length * 4)
    .attr("height", 20)
    .attr("fill", "white")

  people
    .append("text")
    .attr("class", "person-label")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "0.5rem")
    .text(d => d.name)

  people
    .on("click", (event, d) => {
      console.log(`Show ${d.name}'s profile`);
    })
}