<template>
    <svg></svg>
</template>
	
<script>
import * as d3 from "d3";
export default {
    data() {
        return {
            skills: [
                { id: "tech", label: 'Tech Tree' },
                { parentId: "tech", id: "languages", label: 'Languages', },
                {
                    parentId: "languages",
                    id: "python",
                    label: 'Python',
                    iconHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png',
                    skillLevel: 90,
                    descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
                },
                {
                    parentId: "languages",
                    id: "javascript",
                    label: 'JavaScript',
                    iconHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
                    skillLevel: 90,
                    descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
                },
                {
                    parentId: "languages",
                    id: "java",
                    label: 'Java',
                    iconHref: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
                    skillLevel: 0,
                    descriptions: ['Mainly worked with webserver backend frameworks with it.', 'Used in some simple machine learning applications and projects such as Gestice League and Project 21.']
                }
            ],
            skillTree: null,
            movies: [{
                "Title": "Adaptation",
                "Distributor": "Sony Pictures",
                "Genre": "Comedy",
                "Worldwide_Gross": 22498520,
                "Rating": 91
            },
            {
                "Title": "Air Bud",
                "Distributor": "Walt Disney Pictures",
                "Genre": "Comedy",
                "Worldwide_Gross": 27555061,
                "Rating": 45
            },
            {
                "Title": "Air Force One",
                "Distributor": "Sony Pictures",
                "Genre": "Action",
                "Worldwide_Gross": 315268353,
                "Rating": 78
            }]
        }
    },
    mounted() {
        let hierarchy = d3.stratify()(this.skills);
        const treeLayout = d3.tree().size([
            1280,
            500,
        ]);
        hierarchy = treeLayout(hierarchy);
        this.svg = d3
            .select("svg")
            .attr("width", "100%")
            .attr("height", 500)
            .attr("style", "border: 1px solid black")
            .attr("cursor", "grab")
            .attr("position", "relative");
        this.skillTree = this.svg.append("g");

        const links = hierarchy.links();
        const nodes = hierarchy.descendants();

        console.log(nodes);
        // draw a circle 
        this.skillTree
            .select("circle")
            .data(nodes)
            .enter()
            .append('circle')
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('r', 20)
            .style('fill', 'green');

    },
    plugins: [
        { src: '~node_modules/d3/dist/d3.js', ssr: false }
    ]
}
</script>
	
<style scoped>

</style>