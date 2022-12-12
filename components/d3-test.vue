<template>
  <div>
    <h2></h2>
    <p id="d3-target"></p>

    <svg></svg>
  </div>
  </template>
	
<script>

export default {
  name: "D3Test",
  data() {
    return {
      data: [
        {date: new Date(2018, 0, 1), value: 10},
        {date: new Date(2018, 0, 2), value: 20},
        {date: new Date(2018, 0, 3), value: 30},
        {date: new Date(2018, 0, 4), value: 40},
        {date: new Date(2018, 0, 5), value: 50},
        {date: new Date(2018, 0, 6), value: 60},
        {date: new Date(2018, 0, 7), value: 70},
        {date: new Date(2018, 0, 8), value: 80},
        {date: new Date(2018, 0, 9), value: 90},
        {date: new Date(2018, 0, 10), value: 100},
        {date: new Date(2018, 0, 11), value: 110},
        {date: new Date(2018, 0, 12), value: 120},
        {date: new Date(2018, 0, 13), value: 130},
        {date: new Date(2018, 0, 14), value: 140},
        {date: new Date(2018, 0, 15), value: 150},
        {date: new Date(2018, 0, 16), value: 160},
        {date: new Date(2018, 0, 17), value: 170},
        {date: new Date(2018, 0, 18), value: 180},
        {date: new Date(2018, 0, 19), value: 190},
        {date: new Date(2018, 0, 20), value: 200},
        {date: new Date(2018, 0, 21), value: 210},
        {date: new Date(2018, 0, 22), value: 220},
        {date: new Date(2018, 0, 23), value: 230}]
      }
    },
  mounted() {
    d3.select("#d3-target").text("")
      const width = 800;
      const height = 500;
      const svg = d3.select("svg").attr("width", width).attr("height", height);
      const g = svg.append("g");
  },
  plugins: [
     { src: '~node_modules/d3/dist/d3.js', ssr: false}
  ]
}
</script>
	
<style scoped>
	
</style>