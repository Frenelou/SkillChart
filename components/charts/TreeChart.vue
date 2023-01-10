<template>
  <div id="tree-chart-container"></div>
</template>

<script>
import { computed } from "vue";
import { useChartStore } from "~/store/";
import { storeToRefs } from "pinia";
import * as d3 from "d3";

import { colors, imageNodes } from "~/utils/chart/nodes";
import { newShade } from "~/utils";

export default {
  setup() {
    const store = useChartStore();

    const { skills } = storeToRefs(store);
    const { getUserInfo } = storeToRefs(store);
    return {
      userInfo: computed(() => getUserInfo?.value),
      userSkills: computed(() =>
        getUserInfo?.value?.skills.map((skill) => skill.name)
      ),
      svg: null,
      g: null,
      skillTree: null,
      d3: null,
      skills,
      colors,
      groups: null,
    };
  },
  mounted() {
    const { skills, colors } = this;
    const container = d3.select("#tree-chart-container");
    console.log(skills);

    skills.children.forEach((skillType) => {
      skillType.children.forEach((skill) => {
        const root = d3.hierarchy(skill);

        const width = skill.children?.length * 100 || 100;
        const height = root.height * 200 || 200;
        const skillColor = colors[skill.techType || "other"];

        const svg = container
          .append("svg")
          .attr("class", "skill-container no-skill")
          .attr("id", skill.label + "-" + skill.children?.length)
          .text(skill.label)
          .attr("width", width)
          .attr("height", height)
          .attr("style", `--color:${newShade(skillColor, 0.5)}`);

        const tree = svg
          .append("g")
          .attr("transform", "translate(" + width / 2 + ",0)");
        const treeLayout = d3.tree();
        treeLayout.nodeSize([100, 100]);
        treeLayout(root);

        this.drawLinks(tree, root.links());
        this.drawNodes(tree, root.descendants());
      });
    });
  },
  methods: {
    drawNodes(tree, nodes) {
      const getIcon = this.getIcon;
      const rectWidth = 120;
      const { userSkills } = this;

      const node = tree
        .selectAll("g.node")
        .data(nodes)
        .enter()
        .append("g")
        .classed("node", true)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      node
        .append("foreignObject")
        .attr("width", rectWidth)
        .attr("height", rectWidth)
        .attr("x", function (d, i) {
          return -rectWidth / 2;
        })
        .append("xhtml:div")
        .html(function (d) {
          const { skillLevel = 2, label } = d.data;
          const hasSkill = userSkills?.includes(label);
          return `
            <div class="skill ${hasSkill ? "has-skill" : ""}">
              <div
                class="skill-content ${skillLevel ? "has-icon" : ""}"
                style="border-color:${colors[d.data.techType || "other"]}">
              </div>
            </div>`;
        });
      const cont = node.select(".skill-content");
      imageNodes(cont, rectWidth / 2, false);

      document.querySelectorAll(".has-skill").forEach((el) => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          e.target.classList.toggle("active");
        });
        el.closest(".skill-container")?.classList.remove("no-skill");
      });
    },
    drawLinks(tree, links) {
      tree
        .selectAll("line.link")
        .data(links)
        .enter()
        .append("line")
        .classed("link", true)
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    },
    zoom: function (svg, tree) {
      svg.call(
        d3
          .zoom()
          .scaleExtent([0.1, 10])
          .on("zoom", (event) => {
            tree.attr("transform", event.transform);
          })
      );
    },
  },
};
</script>

<style lang="scss">
#tree-chart-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
}

.skill:not(.has-skill) .skill-content,
.skill-container.no-skill {
  filter: grayscale(1) opacity(0.5);
}

.skill {
  display: block;
  width: 100px;
  min-height: 45px;
  font-size: 14px;
  background-color: inherit;
  margin: auto;
  padding: 0;
  background-color: #fff;
  
  &-container {
    border: 2px solid var(--color);
    padding: 2rem;
    border-radius: 10px;

    &:not(.no-skill) {
      filter: drop-shadow(1px 2px 4px rgba(185, 185, 185, 0.2));
    }
  }

  &-content {
    width: 90px;
    min-height: 45px;
    margin: auto;
    border: 2px solid;
    border-radius: 5px;
    text-align: center;
    
    &.has-icon {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }

  img {
    width: 80%;
    margin: auto;
    display: block;
  }
}
</style>
