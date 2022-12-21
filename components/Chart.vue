<template>
  <svg id="radial_chart"></svg>
</template>

<script>
import { watch, ref, computed, onMounted } from "vue";
import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'

import * as d3 from "d3";
import { circleNodes, imageNodes, textNodes, toggleNodes, peopleNodes } from "../utils/chart/nodes";

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

  watch: {
    skills: function (newVal, oldVal) {
      this.initChart(newVal);
    }
  },

  methods: {
    initChart: function () {
      const svgRect = document.querySelector("svg").getBoundingClientRect();
      this.width = svgRect.width;
      this.height = svgRect.height;
      this.radius = this.width / 2;;
      this.tree = d3
        .tree()
        .size([2 * Math.PI, this.radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      this.svg = d3.select("svg")
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
      let nodes = nodegroup.selectAll("g")
        .data(nodes_data,
          (d) => d.parent ? d.parent.data.name + d.data.name : d.data.name);

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

    },

    createNodes: function (nodes, radius = 20) {
      let node = nodes
        .attr('id', (d) => `${d.data.label}_wrapper`)
        .attr("class", (d) => `node--wrapper`)

      const skillsNodes = node.filter(d => !d.people && !d.data.rootSkill);
      circleNodes(skillsNodes, radius);
      imageNodes(skillsNodes, radius);
      this.skillClickHandler(skillsNodes);

      const rootSkillsNodes = textNodes(node.filter((d) => d.data.rootSkill));
      toggleNodes(rootSkillsNodes, this.updateChart);
    },
    togglePeople: function (show) {
      this.showPeople = show ? true : !this.showPeople;

      const chart = document.querySelector(`#radial_chart`);
      chart.classList.toggle('chart--filtered', this.showPeople);

      if (this.showPeople) peopleNodes(this.peopleWithSkills, this.g)
      else {
        this.selectedSkills = [];
        d3.select('#people-group').remove()
        document.querySelectorAll('.node--selected').forEach(node => node.classList.remove('node--selected'))
      }
    },
    skillClickHandler: function (node) {
      console.log("skillClickHandler", node);
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
    zoom: function () {
      this.svg.call(d3.zoom().scaleExtent([0.1, 10])
        .on("zoom", (event) => {
          this.g.attr("transform", event.transform);
        })
      );
    },
  },
  mounted() {
    this.fetchData();
    document.querySelector("#radial_chart").addEventListener('click', (event) => {
      if (event.currentTarget == event.target && event.target.classList.contains('chart--filtered')) this.togglePeople()
    })
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
