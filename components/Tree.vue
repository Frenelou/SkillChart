<template>
  <div>
    <svg style="width:100%;height:100vh;">
      <g />
    </svg>
  </div>
</template>
	
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      skillTree: null,
      skills: [
        { id: "skills", label: 'Skill Tree' },
        { parentId: "skills", id: "languages", label: 'Languages', },
        { parentId: "skills", id: "office", label: "Office" },
        {
          parentId: "languages",
          id: "python",
          label: 'Python',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "languages",
          id: "javascript",
          label: 'JavaScript',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "javascript",
          id: "vue",
          label: 'Vue',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "javascript",
          id: "react",
          label: 'React',
          skillLevel: 10,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "javascript",
          id: "d3.js",
          label: 'D3.js',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "python",
          id: "django",
          label: 'Django',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "python",
          id: "flask",
          label: 'Flask',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",

          id: "excel",
          label: 'Excel',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",
          id: "word",
          label: 'Word',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",
          id: "powerpoint",
          label: 'Powerpoint',
          skillLevel: 90,
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },

      ],

      groups: null
    }
  },
  mounted() {
    this.skillTree = d3.select('svg');
    let root = d3.hierarchy(this.makeGroups(this.skills));

    var treeLayout = d3.tree();
    treeLayout.size([1000, 1000]);
    treeLayout(root);

    this.drawLinks(root.links());
    this.drawNodes(root.descendants());

  },
  methods: {
    makeGroups(data) {
      return d3.stratify()
        .id(function (d) { return d.id; })
        .parentId(function (d) { return d.parentId; })
        (data);
    },
    drawNodes(nodes) {
      console.log("drawNodes", nodes);
      const getIcon = this.getIcon;
      const rectWidth = 120;

      const node = this.skillTree.selectAll('g.node')
        .data(nodes)
        .enter()
        .append('g')
        .classed('node', true)
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      // add html div to each node
      node.append('foreignObject')
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('x', function (d, i) {
          return -rectWidth / 2 + 10;
        })
        .append('xhtml:div')
        .html(function (d) {
          const { skillLevel, label } = d.data.data;
          const img = getIcon(label)
          return `
            <div class="skill">
              <div class="skill-content">
                <label>
                  ${label}
                </label>
                ${skillLevel ? `<img src="${img}" alt="${label}">` : ''}
              </div>
            </div>
          `;
        });

    },
    drawLinks(links) {
      console.log("drawLinks", links);
      this.skillTree.selectAll('line.link')
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
    sumWorldwideGross(group) {
      return d3.sum(group, function (d) {
        return d.Worldwide_Gross;
      });
    }
  },
  plugins: [
    { src: '~node_modules/d3/dist/d3.js', ssr: false }
  ]
}
</script>
	
<style lang="scss">
.skill {
  padding: 0 10px;
  font-size: 14px;

  &-content {
    border: 2px solid #000;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    padding: 0.5em;
  }

  img {
    width: 60px;
    margin: 20px auto;
    display: block;
  }
}
</style>