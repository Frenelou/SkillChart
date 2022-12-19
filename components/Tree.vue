<template>
  <div>
    <svg>
    </svg>
  </div>
</template>
	
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      svg: null,
      skillTree: null,
      d3: null,
      people: [
        {
          "name": "John",
          "specialty": "dev",
          "skills": ["python", "django", "javascript", "vue", "d3.js", "excel", "word", "powerpoint"]
        },
        {
          "name": "Linda",
          "specialty": "HR",
          "skills": ["excel", "word", "powerpoint"]
        },
        {
          "name": "Bob",
          "specialty": "dev",
          "skills": ["javascript", "vue", "d3.js"]
        },
        {
          "name": "Alice",
          "specialty": "dev",
          "skills": ["python", "django", "javascript", "vue", "d3.js", "excel", "word", "powerpoint"]
        }
      ],
      skills: [
        { id: "skills", label: 'Skill Tree' },
        { parentId: "skills", id: "languages", label: 'Languages', },
        { parentId: "skills", id: "office", label: "Office" },
        {
          parentId: "languages",
          id: "python",
          label: 'Python',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "languages",
          id: "javascript",
          label: 'JavaScript',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "javascript",
          id: "vue",
          label: 'Vue',
          skillLevel: 90,
          type: "skill",
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
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "python",
          id: "django",
          label: 'Django',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "python",
          id: "flask",
          label: 'Flask',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",

          id: "excel",
          label: 'Excel',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",
          id: "word",
          label: 'Word',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },
        {
          parentId: "office",
          id: "powerpoint",
          label: 'Powerpoint',
          skillLevel: 90,
          type: "skill",
          descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
        },

      ],
      removed_nodes: [],
      groups: null
    }
  },
  mounted() {
    let height = 1000;//+svg.attr("height");
    let width = 1000;//+svg.attr("width");
    let radius = width / 2;

    let tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
    const data = this.getData();
    //const data = d3.json("network.json");
    data.then(function (data) {
      console.log(data);

      var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)

      var g = svg.append("g")
      // .attr("transform",'translate('+width/2+','+height/2+')')

      const linkgroup = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      const nodegroup = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3);

      function newdata(animate = true) {
        let root = tree(d3.hierarchy(data));
        let links_data = root.links();
        let links = linkgroup
          .selectAll("path")
          .data(links_data, d => d.source.data.name + "_" + d.target.data.name);

        links.exit().remove();

        let newlinks = links
          .enter()
          .append("path")
          .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(0.1));

        let t = d3.transition()
          .duration(animate ? 400 : 0)
          .ease(d3.easeLinear)
          .on("end", function () {
            const box = g.node().getBBox();
            svg.transition().duration(1000).attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
          });

        let alllinks = linkgroup.selectAll("path")
        alllinks
          .transition(t)
          .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

        let nodes_data = root.descendants().reverse();
        let nodes = nodegroup
          .selectAll("g")
          .data(nodes_data, function (d) {
            if (d.parent) {
              return d.parent.data.name + d.data.name;
            }
            return d.data.name
          });

        nodes.exit().remove();

        let newnodes = nodes
          .enter().append("g");

        let allnodes = animate ? nodegroup.selectAll("g").transition(t) : nodegroup.selectAll("g");
        allnodes
          .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `);
        newnodes.append("circle")
          .attr("r", 4.5)
          .on("click", function (event, d) {
            let altChildren = d.data.altChildren || [];
            let children = d.data.children;
            d.data.children = altChildren;
            d.data.altChildren = children;
            newdata();
          });

        nodegroup.selectAll("g circle").attr("fill", function (d) {
          let altChildren = d.data.altChildren || [];
          let children = d.data.children;
          return d.children || (children && (children.length > 0 || altChildren.length > 0)) ? "#555" : "#999"
        });

        newnodes.append("text")
          .attr("dy", "0.31em")
          .text(d => d.data.name)
          .clone(true).lower()
          .attr("stroke", "white");

        nodegroup.selectAll("g text")
          .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
          .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
          .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null);

      }

      newdata(false);
    })
  },
  methods: {
    getData() {
      return d3.json("data.json");
    },

    handleClick(e, d) {
      const source = d;
      const svg = d3.select('svg');
      const duration = d3.event && d3.event.altKey ? 2500 : 250;
      const margin = ({ top: 10, right: 120, bottom: 10, left: 40 })
      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      const node = gNode.selectAll("g.node")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      // console.log(d.data.id, d);
      const current = document.querySelector(`#${d.data.id}`)
      const isCollapsed = current.classList.contains('collapsed');
      current.classList.toggle('collapsed');
      if (isCollapsed) {
      }
      else {
        const children = d.children;
        this.removed_nodes = [...this.removed_nodes, ...children];
        console.log("removed_nodes", this.removed_nodes);
        children.forEach(child => {
          console.log(`g#${child.data.id}`);
          d3.select(`g#${child.data.id}`)
            .attr("transform", c => `translate(${d.x},${d.
              y})`)
        });
      }

    },

    handleZoom(e) {
      d3.select('svg')
        .attr('transform', e.transform);
    },
    makeGroups(data) {

      const skills = data;
      const people = this.people;

      // For each person
      // For each person's skills
      // add the person to the skill's people array
      skills.forEach(skill => {
        skill.people = [];
        people.forEach(person => {
          if (person.skills.includes(skill.id)) {
            const entry = {
              ...person,
              type: 'person',
              parentId: skill.id
            }
            skills.push(entry);
          }
        });
      });

      console.log("data", skills);

      return d3.stratify()
        .id(function (d) { return d.id; })
        .parentId(function (d) { return d.parentId; })
        (skills);
    },
    drawNodes(nodes) {
      console.log("drawNodes", nodes);
      const getIcon = this.getIcon;
      const rectWidth = 120;

      const node = this.skillTree.selectAll('g.node')
        .data(nodes)
        .enter()
        .append('g')
        .classed('node skill-node', true)
        .attr('id', function (d) {
          return d.data.id;
        })
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        })
        .on('click', this.update(d))
        ;

      // add html div to each node
      node.append('foreignObject')
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('x', function (d, i) {
          return -rectWidth / 2;
        })
        .append('xhtml:div')
        .html(function (d) {
          const { skillLevel, label } = d.data.data;
          const img = getIcon(label)
          return `
            <div class="skill">
              <div class="skill-content ${skillLevel ? 'has-icon' :
              ''}">
        <label>
        ${label}
                </label >
          ${skillLevel ? `<img src="/${img}" alt="${d.data.label}">` : ''}
              </div>
            </div>  `;
        })

    },
    update(source) {
      const svg = d3.select('svg');
      const margin = ({ top: 10, right: 120, bottom: 10, left: 40 })
      const width = 960;

      const duration = d3.event && d3.event.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      // Update the nodes…
      const node = gNode.selectAll("g.node")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },
    drawLinks(links) {
      console.log("drawLinks", links);
      this.skillTree.selectAll('line.link')
        .data(links)
        .enter()
        .append('path')
        .classed('link', true)
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr("d", d3.linkHorizontal()
          .x(function (d) { return d.x; })
          .y(function (d) { return d.y; })
        )

    },
    getIcon(label) {
      const src = `icons/${label}.png`;
      var http = new XMLHttpRequest();

      http.open('HEAD', src, false);
      http.send();

      return http.status != 404 ? src : 'icons/default.png';
    },

    zoomAndPan() {
      let width = 1000;
      let height = 1000;

      const svg = d3.select('svg')
        .attr("viewBox", [0, 0, width, height]);
      const g = d3.select('svg g');
      g.attr("cursor", "grab");

      g.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

      svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([-2, 8])
        .on("zoom", zoomed));

      function dragstarted() {
        d3.select(this).raise();
        svg.attr("cursor", "grabbing");
      }

      function dragged(event, d) {
        d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
      }

      function dragended() {
        svg.attr("cursor", "grab");
      }
      function zoomed({ transform }) {
        g.attr("transform", transform);
      }
    }

  }
}
</script>
	
<style lang="scss">
.skill {
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;

  &-node {
    transition: translate 0.5s ease-in-out;
  }

  &-content {
    &.has-icon {

      height: 80px;
      width: 80px;
    }

    border: 2px solid #000;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    padding: 0.5em;
  }

  img {
    width: 60px;
    margin: auto;
    display: block;
  }
}
</style>