<template>
  <svg id="radial_chart"></svg>
</template>

<script>
import * as d3 from "d3";
import { selection } from "d3";

export default {
  name: "Chart",
  data() {
    return {
      width: 0,
      height: 0,
      svg: null,
      colors: {
        "design": "#e76f51",
        "programming": "#2a9d8f",
        "javascript": "#ffb703",
        "framework": "#2a9d8f",
        "css": "#F16896",
        "databases": "#264653",
        "adobe-suite": "#e63946",
        "other": "blue",
      },
      data: this.getData(),
      people: [],
      selectedSkills: [],
      peopleWithSkills: [],
    };
  },
  watch: {
    data: function (newVal, oldVal) {
      this.drawChart(newVal);
    },
    selectedSkills: {
      handler: function (newVal, oldVal) {
        console.log("selected skills changed", newVal);
        this.peopleWithSkills = this.people.filter((person) => {
          return newVal.every((skill) => person.skills.includes(skill));
        });
      },
      deep: true,
    },
  },
  methods: {
    drawChart: function (data) {
      const svg = document.querySelector("svg");
      const { width, height } = svg.getBoundingClientRect();
      const radius = width / 2;

      this._data = {
        ...this._data,
        svg,
        width,
        height,
      }

      this.tree = d3
        .tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      this.svg = d3.select("svg").attr("width", width).attr("height", height);
      this.g = this.svg.append("g");

      this.linkgroup = this.g
        .append("g")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      this.nodegroup = this.g
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3);

      this.updateChart(false);
      this.zoom();
    },
    updateChart: function (animate = true) {
      const { svg, g, linkgroup, nodegroup, tree, updateChart, createNode } =
        this;
      let root = tree(d3.hierarchy(this.data));
      this.root = root;

      let links_data = root.links();
      let links = linkgroup
        .selectAll("path")
        .data(links_data, (d) => d.source.data.name + "_" + d.target.data.name);

      links.exit().remove();

      links
        .enter()
        .append("path")
        .attr(
          "d",
          d3
            .linkRadial()
            .angle((d) => d.x)
            .radius(0.1)
        );

      let t = d3
        .transition()
        .duration(animate ? 400 : 0)
        .ease(d3.easeLinear)
        .on("end", function () {
          const box = g.node().getBBox();
          svg
            .transition()
            .duration(1000)
            .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
        });

      let alllinks = linkgroup.selectAll("path");
      alllinks.transition(t).attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

      let nodes_data = root.descendants().reverse();
      let nodes = nodegroup.selectAll("g").data(nodes_data, function (d) {
        if (d.parent) {
          return d.parent.data.name + d.data.name;
        }
        return d.data.name;
      });

      nodes.exit().remove();

      let newnodes = nodes.enter().append("g");

      let allnodes = animate
        ? nodegroup.selectAll("g").transition(t)
        : nodegroup.selectAll("g");
      allnodes.attr(
        "transform",
        (d) => `
          rotate(${(d.x * 180) / Math.PI - 90})
          translate(${d.y},0)
          `
      );

      createNode(newnodes);

      nodegroup.selectAll("g circle").attr("fill", function (d) {
        let altChildren = d.data.altChildren || [];
        let children = d.data.children;
        return d.children ||
          (children && (children.length > 0 || altChildren.length > 0))
          ? "#555"
          : "#999";
      });

      nodegroup
        .selectAll("g text")
        .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
        .attr("text-anchor", (d) =>
          d.x < Math.PI === !d.children ? "start" : "end"
        );
    },

    createNode: function (nodes, radius = 20) {
      const updateChart = this.updateChart;
      let node = nodes
        .attr('id', (d) => `${d.data.label}_wrapper`)
        .attr("class", (d) => `node--wrapper`)
        .attr('data-techType', (d) => d.data.techType);

      this.addTextNodes(node);
      this.addCircleNodes(node.filter(d => !d.people), radius);
      this.addCircleNodes(node.filter(d => d.people), radius / 3);
      this.addImageNodes(node, radius);

      this.addToggleNodes(node);
      this.zoomViewToNode(node);
    },
    zoomViewToNode(node) {
      const chart = document.querySelector(`#radial_chart`);
      const { people } = this;
      node.on("click", (event, d) => {
        const { selectedSkills } = this;

        // add or remove node label from this.selectedSkills
        if (!selectedSkills.includes(d.data.label)) selectedSkills.push(d.data.label);
        else selectedSkills.splice(selectedSkills.indexOf(d.data.label), 1);

        event.currentTarget.classList.toggle('node--selected');
        if (!event.altKey) {
          chart.classList.toggle('chart--filtered');
        } else {
          document.addEventListener('keyup', (event) => {
            chart.classList.add('chart--filtered')
            document.removeEventListener('keyup', event)
          });
        }
      });

      const showPeople = (event, d) => {
        const peopleWithSkills = people.filter(person =>
          selectedSkills.every(skill => person.skills.includes(skill)))
        console.log(selectedSkills, peopleWithSkills.map(p => ({ name: p.name, skills: p.skills })))

        // generate cricles for each person in people with d3
        // add to chart

        const peopleGroup = this.g
          .append("g")
          .attr("class", "people-group")

        const peopleData = peopleGroup
          .selectAll("g")
          .data(peopleWithSkills)
          .enter()
          .append("g")
          .attr("class", "person")
          .attr("transform", (d, i) => `translate(${i * 100}, 0)`)
          .attr("data-name", (d) => d.name)

        peopleData
          .append("circle")
          .attr("r", 20)
          .attr("fill", "red")

        // update peopleGroup when peopleWithSkills changes

        peopleData
          .append("text")
          .text((d) => d.name)
          .attr("x", 0)
          .attr("y", 30)
          .attr("text-anchor", "middle")

      }

      chart.addEventListener('click', (event) => {
        if (event.currentTarget == event.target) {
          document.querySelectorAll('.node--selected').forEach(node => node.classList.remove('node--selected'))
          chart.classList.remove('chart--filtered')
          this.selectedSkills.splice(0, this.selectedSkills.length)
          // remove peopleGroup
          d3.select('.people-group').remove()

        }
      })
    },
    addToggleNodes(node) {
      node.filter((d) => d.data.rootSkill).on("click", (event, d) => {
        let altChildren = d.data.altChildren || [];
        let children = d.data.children;
        d.data.children = altChildren;
        d.data.altChildren = children;
        this.updateChart();
      });
    },
    addCircleNodes(node, radius) {

      node.filter((d) => !d.data.rootSkill)
        .append("path")
        .attr("id", (d) => `${d.data.label || d.data.name}_path`)
        .attr("fill", "white")
        .attr("stroke", (d) => this.colors[d.data.techType || 'other'])

        .attr(
          "d",
          d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(359)
        );
    },
    addTextNodes(node) {
      console.log("addTextNode", node);
      const textNodes = node.filter((d) => d.data.rootSkill);
      textNodes
        .append("rect")
        .attr("class", "node--label-bg")
        .attr("x", (d) => (d.x < Math.PI === !d.children ? 0 : -100))
        .attr("y", -20)
        .attr("width", 100)
        .attr("height", 40)
        .attr("fill", "white")

      textNodes
        .append("text")
        .attr("class", "node--label")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
        .attr("text-anchor", (d) =>
          d.x < Math.PI === !d.children ? "start" : "end"
        )
        .text((d) => d.data.name)
        .clone(true)
        .lower()
        .attr("stroke", "white");
    },
    addImageNodes(node, radius) {

      const imageNodes = node.filter((d) => !d.data.rootSkill && !d.data.people);
      const img_radius = radius * 0.9;

      imageNodes.select("path").attr("stroke-width", 18)
      imageNodes
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

      imageNodes
        .filter((d) => d.data.icon)
        .append("foreignObject")
        .attr("width", img_radius * 2)
        .attr("height", img_radius * 2)
        .attr("x", -img_radius)
        .attr("y", -img_radius)
        .append("xhtml:div")
        .attr("class", "node")
        .html((d) => `<img src="/icons/${d.data.icon}.png" alt="${d.data.label}">`);
    }
    ,
    getData() {
      const people = this.$axios.$get(`/data/people.json`)
      const skills = this.$axios.$get(`/data/skills.json`)
        .then((result) => addTechType(result))

      Promise.all([skills, people]).then((values) => {
        this.people = values[1];
        this.data = addPeopleToNodes(...values)
      });

      const addTechType = (node) => {
        node.children?.forEach((child) => {
          child.techType = child.techType || node.techType
          addTechType(child);
        });
        return node
      };

      const addPeopleToNodes = (node, people) => {
        const node_people = people.filter((person) => person.skills.includes(node.label));
        // if (node_people.length) node.people = node_people;
        if (node_people.length) node.children = [...node.children || [], ...node_people];

        node.children?.forEach((child) => addPeopleToNodes(child, people));
        return node
      };

    },
    getIcon(label) {
      const src = `icons/${label}.png`;
      var http = new XMLHttpRequest();

      http.open('HEAD', src, false);
      http.send();

      return http.status != 404 ? src : 'icons/default.png';
    },
    zoom: function () {
      this.svg.call(
        d3
          .zoom()
          .scaleExtent([0.1, 10])
          .on("zoom", (event) => {
            this.g.attr("transform", event.transform);
          })
      );
    },
  },
};
</script>

<style lang="scss">
svg {
  height: calc(100vh - 20px);
  width: calc(100% - 20px);
  margin: 0 auto;

  &.chart--filtered {

    .links,
    .node--wrapper:not(.node--selected) {
      display: none;
    }
  }
}

.node {
  &--wrapper {
    cursor: pointer;
  }

  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  margin: 10px;
}
</style>
