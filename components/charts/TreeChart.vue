<template>
  <div id="tree-chart-container">
  </div>
</template>
	
<script>
import { computed } from "vue";
import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'
import { colors } from "~/utils/chart/nodes";
import * as d3 from "d3";
export default {
  setup() {
    const store = useChartStore();

    const { skills } = storeToRefs(store)
    const { getUserInfo } = storeToRefs(store)
    return {
      userInfo: computed(() => getUserInfo?.value),
      userSkills: computed(() => getUserInfo?.value?.skills.map(skill => skill.name)),
      svg: null,
      g: null,
      skillTree: null,
      d3: null,
      skills,
      colors,
      groups: null
    }
  },
  mounted() {
    const { skills, colors, newShade } = this;
    const container = d3.select('#tree-chart-container');
    console.log(skills);

    skills.children.forEach(skillType => {
      skillType.children.forEach(skill => {
        const root = d3.hierarchy(skill);

        const width = skill.children?.length * 100 || 100;
        const height = root.height * 200 || 200;
        const skillColor = colors[skill.techType || 'other'];

        const svg = container.append('svg')
          .attr('class', 'skill-container no-skill')
          .attr('id', skill.label + '-' + skill.children?.length)
          .text(skill.label)
          .attr('width', width)
          .attr('height', height)
          .attr('style', `--color:${newShade(skillColor, .5)}`);

        const tree = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',0)')
          ;

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

      const node = tree.selectAll('g.node')
        .data(nodes)
        .enter()
        .append('g')
        .classed('node', true)
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      // add html div to each node
      node
        .append('foreignObject')
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('x', function (d, i) {
          return -rectWidth / 2;
        })
        .append('xhtml:div')
        .html(function (d) {
          const { skillLevel = 2, label } = d.data;
          const img = getIcon(label)
          const hasSkill = userSkills?.includes(label);
          return `
            <div class="skill ${hasSkill ? 'has-skill' : ''}">
              <div 
                class="skill-content ${skillLevel ? 'has-icon' : ''}"
                style="border-color:${colors[d.data.techType || 'other']}">
                <label>${label}</label >
                ${skillLevel ? `<img src="/${img}" alt="${label}">` : ''}
              </div>
            </div>`});

      document.querySelectorAll('.has-skill').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          e.target.classList.toggle('active');
        })
        el.closest('.skill-container')?.classList.remove('no-skill')
        console.log(el.closest('.skill-container'));
      })

    },
    drawLinks(tree, links) {
      tree.selectAll('line.link')
        .data(links)
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; })
        .attr('stroke', 'black')
        .attr('stroke-width', 1);
    },
    getIcon(label) {
      const src = `icons/${label}.png`;
      var http = new XMLHttpRequest();

      http.open('HEAD', src, false);
      http.send();

      return http.status != 404 ? src : 'icons/default.png';
    },
    zoom: function (svg, tree) {
      svg.call(d3.zoom().scaleExtent([.1, 10])
        .on("zoom", (event) => {
          tree.attr("transform", event.transform);
        })
      );
    },
    newShade: function (hexCode, opacity = 1) {
      var hex = hexCode.replace('#', '');

      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);

      /* Backward compatibility for whole number based opacity values. */
      if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;
      }

      return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    }

  }
}
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
  height: 100px;
  font-size: 14px;
  background-color: #fff;
  margin: auto;
  padding: 0;

  &-container {
    border: 2px solid var(--color);
    padding: 2rem;
    border-radius: 10px;

    &:not(.no-skill) {
      filter: drop-shadow(2px 4px 6px rgba(185, 185, 185, 0.514));
      background-color: #fff;
  }
}

&-content {
  margin: auto;

  &.has-icon {
    height: 90px;
    width: 90px;
  }

  border: 2px solid #000;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}

img {
  width: 60px;
  margin: auto;
  display: block;
}
}
</style>