<template>
  <svg id="radial_chart"></svg>
</template>

<script>
import * as d3 from "d3";
import { watch, ref, computed, onMounted } from "vue";

import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = useChartStore();

    const { skills, people, selectedSkills, fetchData, getPeopleWithSkills } = storeToRefs(store)

    return {
      skills,
      people,
      selectedSkills,
      peopleWithSkills: computed(() => getPeopleWithSkills.value),
      width: 0,
      height: 0,
      svg: null,
      showPeople: false,
      fetchData,
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
    }
  },

  mounted() {
    this.fetchData();
    document.querySelector("#radial_chart").addEventListener('click', (event) => {
      if (event.currentTarget == event.target) this.togglePeople()
    })
  },

  watch: {
    skills: function (newVal, oldVal) {
      this.initChart(newVal);
    }
  },

  methods: {
    initChart: function (data) {
      const svg = document.querySelector("svg");
      const { width, height } = svg.getBoundingClientRect();
      const radius = width / 2;

      this.width = width;
      this.height = height;
      this.radius = radius;
      this.svg = svg;

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
      const { svg, g, linkgroup, nodegroup, tree, createNodes } = this;
      this.root = tree(d3.hierarchy(this.skills));

      let links_data = this.root.links();
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

      let nodes_data = this.root.descendants().reverse();
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

      createNodes(newnodes);

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

    createNodes: function (nodes, radius = 20) {
      let node = nodes
        .attr('id', (d) => `${d.data.label}_wrapper`)
        .attr("class", (d) => `node--wrapper`)
        .attr('data-techType', (d) => d.data.techType);

      this.addTextNodes(node);
      this.addCircleNodes(node.filter(d => !d.people && !d.data.rootSkill), radius);
      this.addCircleNodes(node.filter(d => d.people), radius / 3);
      this.addImageNodes(node, radius);

      this.addToggleNodes(node);
      this.skillClickHandler(node);
    },
    addPeople() {
      const { peopleWithSkills } = this;
      const peopleWidth = 15

      d3.select('#people-group')?.remove()

      const peopleGroup = this.g
        .append("g")
        .attr("id", "people-group")

      const peopleData = peopleGroup
        .selectAll("g")
        .data(this.peopleWithSkills)

      const peopleCoords = [{ x: 0, y: 0 }]

      var i = 0;
      var radius = 0;
      const stepBasis = peopleWidth * 2.5
      while (i < peopleWithSkills.length) {
        var steps = Math.floor((2 * radius * Math.PI) / stepBasis);
        for (var index = 0; index < steps; index++) {
          const [x, y] = ["cos", "sin"].map((fn) => Math.floor(0 + radius * Math[fn](2 * Math.PI * index / steps)))
          peopleCoords.push({ x, y })
          i++;
          if (i == peopleWithSkills)
            break;
        }
        radius = radius + stepBasis;
      }

      const people = peopleData
        .enter()
        .append("g")
        .attr("class", "person")
        .attr("transform", (d, i) => `translate(${peopleCoords[i].x}, ${peopleCoords[i].y})`)

      people
        .append("circle")
        .attr("r", peopleWidth)
        .attr("fill", "red")
        .attr('opacity', d => d.skills.length * 0.2)
        .attr("cursor", "pointer")

      // add background to people labels
      people
        .append("rect")
        .attr("class", "person-label--bg")
        .attr("x", d => -d.name.length * 1.5)
        .attr("y", -10)
        .attr("width", d => d.name.length * 4)
        .attr("height", 20)
        .attr("fill", "white")
      // add people labels
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
    },
    togglePeople(show) {
      this.showPeople = show ? true : !this.showPeople;

      const chart = document.querySelector(`#radial_chart`);
      chart.classList.toggle('chart--filtered', this.showPeople);

      if (this.showPeople) this.addPeople()
      else {
        this.selectedSkills = [];
        d3.select('#people-group').remove()
        document.querySelectorAll('.node--selected').forEach(node => node.classList.remove('node--selected'))
      }
    },
    skillClickHandler(node) {
      node.on("click", (event, d) => {
        const { selectedSkills } = this;

        // add or remove node label from this.selectedSkills
        if (!selectedSkills.includes(d.data.label)) selectedSkills.push(d.data.label);
        else selectedSkills.splice(selectedSkills.indexOf(d.data.label), 1);

        // add or remove node--selected class
        event.currentTarget.classList.toggle('node--selected');

        // Show people immediately unless altKey is pressed
        if (!event.shiftKey) this.togglePeople()
        else {
          document.addEventListener('keyup', (event) => {
            this.togglePeople(true)
            document.removeEventListener('keyup', event)
          });
        }
      });
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
    addCircleNodes(node, radius, fill = "#fff", stroke = "none") {
      node
        .append("path")
        .attr("id", (d) => `${d.name || d.data.label}_path`)
        .attr("fill", fill)
        .attr("stroke", (d) => d.data ? this.colors[d.data.techType || 'other'] : stroke)

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
}

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

g.person {
  cursor: pointer;

  &:not(:hover) {

    rect,
    text {
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
