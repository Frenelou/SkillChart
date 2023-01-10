(window.webpackJsonp=window.webpackJsonp||[]).push([[8,3,4,5,6,7],{413:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));n(18),n(38),n(42),n(28),n(29),n(67),n(88),n(51),n(37),n(257);var r=n(123),o=n(412),l=n(414),c="/SkillChart/data/",d=Object(r.c)("chart",{state:function(){return{skills:{},people:[],selectedSkills:[],lowerLevelChildrenCount:0,currentUserId:1,modalActive:!1}},actions:{fetchData:function(){var t=this,e=o.a.get("".concat(c,"/people.json")).then((function(t){return t.data})),n=o.a.get("".concat(c,"/skills.json")).then((function(t){return t.data})).then((function(t){return r(t)}));Promise.all([n,e]).then((function(e){t.skills=e[0],t.people=e[1]}));var r=function t(e){var n;return null===(n=e.children)||void 0===n||n.forEach((function(n){n.techType=n.techType||e.techType,t(n)})),e}},setSkills:function(t){this.skills=t},setSelectedSkills:function(t){console.log("setSelectedSkills",t),this.selectedSkills=t},toggleModal:function(){this.modalActive=!this.modalActive},setCurrentUserId:function(t){this.currentUserId=t}},getters:{getPeopleWithSkills:function(t){var e=t.people;t.skills;return t.selectedSkills.length?e.filter((function(e){return t.selectedSkills.every((function(t){return e.skills.map((function(s){return s.name})).includes(t)}))})):[]},getLowerLevelChildrenCount:function(t){return Object(l.a)(t.skills)},getUserInfo:function(t){return t.people?t.people.find((function(e){return e.id===t.currentUserId})):null}}})},414:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));n(18),n(28),n(35),n(81);var r=function t(e){var n,r,o=0;return null===(n=e.children)||void 0===n||n.forEach((function(e){o+=t(e)})),o+((null===(r=e.children)||void 0===r?void 0:r.length)||0)},o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=t.replace("#","");3===n.length&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]);var r=parseInt(n.substring(0,2),16),g=parseInt(n.substring(2,4),16),b=parseInt(n.substring(4,6),16);return e>1&&e<=100&&(e/=100),"rgba("+r+","+g+","+b+","+e+")"}},416:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return l})),n.d(e,"c",(function(){return c})),n.d(e,"e",(function(){return d})),n.d(e,"f",(function(){return h})),n.d(e,"d",(function(){return f}));n(37),n(29),n(18),n(58);var r=n(415),o={design:"#e76f51",programming:"#2a9d8f",javascript:"#ffb703",framework:"#2a9d8f",css:"#F16896",databases:"#264653","adobe-suite":"#e63946",developer:"lightpink",designer:"lightblue",other:"blue"},l=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#fff";return t.append("path").attr("fill",n).attr("id",(function(t){var e;return"".concat(null===(e=t.data)||void 0===e?void 0:e.label,"_path")})).attr("stroke",(function(t){var e;return o[(null===(e=t.data)||void 0===e?void 0:e.techType)||"other"]})).attr("d",r.a().innerRadius(0).outerRadius(e).startAngle(0).endAngle(359))},c=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=.9*e;return t.select("path").attr("stroke-width",20),t.append("text").append("textPath").attr("xlink:href",(function(t){return"#".concat(t.data.label,"_path")})).style("text-anchor","middle").attr("startOffset","50%").text((function(t){return t.data.name})).attr("font-family","sans-serif").attr("font-weight","bold").attr("fill","white").attr("font-size","9px").attr("dy","0.3em"),t.filter((function(t){return!t.data.rootSkill})).append("foreignObject").attr("width",2*r).attr("height",2*r).attr("x",-r).attr("y",-r).append("xhtml:div").attr("class","node").html((function(t){var e=t.data,label=e.label,r=e.icon,o=void 0===r?"default":r,l=-1*Math.ceil(180*t.x/Math.PI-90),style=n?"transform: rotate(".concat(l,"deg)"):"";return'<img src="icons/'.concat(o,'.png" alt="').concat(label,'"  style="').concat(style,'"/>')})),t},d=function(t){return t.append("rect").attr("class","node--label-bg").attr("x",(function(t){return t.x<Math.PI==!t.children?0:-100})).attr("y",-20).attr("width",100).attr("height",40).attr("fill","white"),t.append("text").attr("class","node--label").attr("dy","0.31em").attr("x",(function(t){return t.x<Math.PI==!t.children?6:-6})).attr("text-anchor",(function(t){return t.x<Math.PI==!t.children?"start":"end"})).text((function(t){return t.data.name})),t},h=function(t,e){t.on("click",(function(t,n){var r=n.data.altChildren||[],o=n.data.children;return n.data.children=r,n.data.altChildren=o,e()}))},f=function(t){var e=r.e("#tooltip");t.on("mouseover",(function(t,n){return e.style("opacity",1).style("left",t.pageX+10+"px").style("top",t.pageY-25+"px").html(n.data?n.data.name:n.first_name+" "+n.last_name)})).on("mouseout",(function(t,n){return e.style("opacity",0)}))}},417:function(t,e,n){var content=n(423);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(155).default)("516759f7",content,!0,{sourceMap:!1})},418:function(t,e,n){var content=n(426);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(155).default)("19f24e1e",content,!0,{sourceMap:!1})},419:function(t,e,n){var content=n(428);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(155).default)("7934e37d",content,!0,{sourceMap:!1})},421:function(t,e,n){var content=n(449);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(155).default)("5d0aa974",content,!0,{sourceMap:!1})},422:function(t,e,n){"use strict";n(417)},423:function(t,e,n){var r=n(154)(!1);r.push([t.i,"#people{width:100%;max-width:400px;height:calc(100% - 20px);margin:0 auto;padding:0;border:1px solid #ccc;border-radius:5px;display:block;overflow:auto;background-color:#fff;box-shadow:0 0 10px rgba(0,0,0,.2);position:fixed;top:10px;right:10px}ul{list-style:none;padding:0;margin:0}ul li{display:flex;align-items:center;padding:1rem;border-bottom:1px solid #ccc;cursor:pointer}ul li .avatar{width:50px;height:50px;border-radius:50%;background:#ccc;margin-right:1rem}ul li .info .name{font-weight:700}ul li .info .email,ul li .info .title{font-size:.8rem}",""]),t.exports=r},424:function(t,e,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(155).default)("e231d8c0",content,!0,{sourceMap:!1})},425:function(t,e,n){"use strict";n(418)},426:function(t,e,n){var r=n(154)(!1);r.push([t.i,"#tree-chart-container{display:flex;flex-wrap:wrap;align-items:center;width:100%;height:100%;grid-gap:2rem;gap:2rem}.skill-container.no-skill,.skill:not(.has-skill) .skill-content{filter:grayscale(1) opacity(.5)}.skill{display:block;width:100px;min-height:45px;font-size:14px;background-color:inherit;margin:auto;padding:0;background-color:#fff}.skill-container{border:2px solid var(--color);padding:2rem;border-radius:10px}.skill-container:not(.no-skill){filter:drop-shadow(1px 2px 4px rgba(185,185,185,.2))}.skill-content{width:90px;min-height:45px;margin:auto;border:2px solid;border-radius:5px;text-align:center}.skill-content.has-icon{display:flex;justify-content:center;flex-direction:column}.skill img{width:80%;margin:auto;display:block}",""]),t.exports=r},427:function(t,e,n){"use strict";n(419)},428:function(t,e,n){var r=n(154)(!1);r.push([t.i,".modal-header{padding:10px;border-bottom:1px solid #ccc}.modal-body{padding:10px;overflow:auto}.modal-footer{padding:10px;border-top:1px solid #ccc}.modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:9998;display:flex;justify-content:center;align-items:center}.modal-inner{background-color:#fff;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,.2);width:100%;height:100%;max-width:1100px;max-height:90vh;position:relative;z-index:9999;display:grid;grid-template-rows:auto 1fr auto;grid-gap:.5rem;gap:.5rem}.modal-close{position:absolute;top:10px;right:10px;background-color:transparent;border:none;cursor:pointer;font-size:1.5rem;color:#ccc;transition:color .2s ease-in-out}.modal-close:hover{color:#000}",""]),t.exports=r},441:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(413),l=n(123),c={setup:function(){var t=Object(l.e)(Object(o.a)()),e=t.getPeopleWithSkills,n=t.toggleModal,c=t.setCurrentUserId;return{peopleWithSkills:Object(r.computed)((function(){return e.value})),setCurrentUserId:c,toggleModal:n}},methods:{showPersonInfo:function(t){this.setCurrentUserId(t),this.toggleModal()}}},d=(n(422),n(59)),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return t.peopleWithSkills.length?e("div",{attrs:{id:"people"}},[e("ul",t._l(t.peopleWithSkills,(function(n,r){return e("li",{key:r,on:{click:function(e){return t.showPersonInfo(n.id)}}},[e("div",{staticClass:"avatar"}),t._v(" "),e("div",{staticClass:"info"},[e("div",{staticClass:"name"},[t._v(t._s(n.first_name)+" "+t._s(n.last_name))]),t._v(" "),e("div",{staticClass:"title"},[t._v(t._s(n.title))]),t._v(" "),e("div",{staticClass:"email"},[t._v(t._s(n.email))])])])})),0)]):t._e()}),[],!1,null,null,null);e.default=component.exports},442:function(t,e,n){"use strict";n.r(e);n(51),n(37),n(18),n(28),n(67),n(88),n(58);var r=n(0),o=n(413),l=n(123),c=n(415),d=n(416),h=n(414),f={setup:function(){var t=Object(o.a)(),e=Object(l.e)(t).skills,n=Object(l.e)(t).getUserInfo;return{userInfo:Object(r.computed)((function(){return null==n?void 0:n.value})),userSkills:Object(r.computed)((function(){var t;return null==n||null===(t=n.value)||void 0===t?void 0:t.skills.map((function(t){return t.name}))})),svg:null,g:null,skillTree:null,d3:null,skills:e,colors:d.b,groups:null}},mounted:function(){var t=this,e=this.skills,n=this.colors,r=c.e("#tree-chart-container");console.log(e),e.children.forEach((function(e){e.children.forEach((function(e){var o,l,d=c.c(e),f=100*(null===(o=e.children)||void 0===o?void 0:o.length)||100,v=200*d.height||200,m=n[e.techType||"other"],k=r.append("svg").attr("class","skill-container no-skill").attr("id",e.label+"-"+(null===(l=e.children)||void 0===l?void 0:l.length)).text(e.label).attr("width",f).attr("height",v).attr("style","--color:".concat(Object(h.b)(m,.5))).append("g").attr("transform","translate("+f/2+",0)"),x=c.g();x.nodeSize([100,100]),x(d),t.drawLinks(k,d.links()),t.drawNodes(k,d.descendants())}))}))},methods:{drawNodes:function(t,e){this.getIcon;var n=120,r=this.userSkills,o=t.selectAll("g.node").data(e).enter().append("g").classed("node",!0).attr("transform",(function(t){return"translate("+t.x+","+t.y+")"}));o.append("foreignObject").attr("width",n).attr("height",n).attr("x",(function(t,i){return-60})).append("xhtml:div").html((function(t){var e=t.data,n=e.skillLevel,o=void 0===n?2:n,label=e.label,l=null==r?void 0:r.includes(label);return'\n            <div class="skill '.concat(l?"has-skill":"",'">\n              <div\n                class="skill-content ').concat(o?"has-icon":"",'"\n                style="border-color:').concat(d.b[t.data.techType||"other"],'">\n              </div>\n            </div>')}));var l=o.select(".skill-content");Object(d.c)(l,60,!1),document.querySelectorAll(".has-skill").forEach((function(t){var e;t.addEventListener("click",(function(t){t.stopPropagation(),t.target.classList.toggle("active")})),null===(e=t.closest(".skill-container"))||void 0===e||e.classList.remove("no-skill")}))},drawLinks:function(t,e){t.selectAll("line.link").data(e).enter().append("line").classed("link",!0).attr("x1",(function(t){return t.source.x})).attr("y1",(function(t){return t.source.y})).attr("x2",(function(t){return t.target.x})).attr("y2",(function(t){return t.target.y})).attr("stroke","black").attr("stroke-width",1)},zoom:function(svg,t){svg.call(c.h().scaleExtent([.1,10]).on("zoom",(function(e){t.attr("transform",e.transform)})))}}},v=(n(425),n(59)),component=Object(v.a)(f,(function(){return(0,this._self._c)("div",{attrs:{id:"tree-chart-container"}})}),[],!1,null,null,null);e.default=component.exports},443:function(t,e,n){"use strict";n.r(e);var r=n(413),o=n(123),l={setup:function(){var t=Object(r.a)(),e=Object(o.e)(t);return{toggleModal:e.toggleModal,modalActive:e.modalActive}}},c=(n(427),n(59)),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:"modal-animation"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.modalActive,expression:"modalActive"}],staticClass:"modal-overlay",on:{click:t.toggleModal}},[e("transition",{attrs:{name:"modal-animation-inner"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.modalActive,expression:"modalActive"}],staticClass:"modal-inner"},[e("div",{staticClass:"modal-header"},[t._t("header"),t._v(" "),e("button",{staticClass:"modal-close",on:{click:t.toggleModal}},[t._v(" x ")])],2),t._v(" "),e("div",{staticClass:"modal-body"},[t._t("body")],2)])])],1)])}),[],!1,null,null,null);e.default=component.exports},448:function(t,e,n){"use strict";n(421)},449:function(t,e,n){var r=n(154)(!1);r.push([t.i,"#chart-container{height:100vh;width:100vw;padding:0;overflow:hidden;margin:0;display:flex;align-items:center;justify-content:center}#chart-container svg{height:100%;width:100%;min-width:1000px;min-height:800px;margin:0 auto}#chart-container svg.chart--filtered .links,#chart-container svg.chart--filtered .node--wrapper:not(.node--selected){filter:grayscale(1) opacity(.5)}#chart-container g.person{cursor:pointer}#chart-container g.person:not(:hover) rect,#chart-container g.person:not(:hover) text{display:none}#chart-container .node{background-color:#fff;width:100%;height:100%;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center}#chart-container .node--wrapper{cursor:pointer}#chart-container .node--selected{filter:drop-shadow(0 0 5px #000)}#chart-container .node img{width:100%;height:100%;-o-object-fit:contain;object-fit:contain;border-radius:50%;margin:10px;transform-box:view-box}#chart-container #tooltip{position:absolute;background-color:#fff;border:1px solid #000;padding:5px;border-radius:5px;opacity:0;transition:opacity .2s ease-in-out;pointer-events:none}",""]),t.exports=r},450:function(t,e,n){"use strict";n(424)},451:function(t,e,n){var r=n(154)(!1);r.push([t.i,"span[data-v-106690f5]{display:block;color:#a9a9a9;font-size:1.2rem}",""]),t.exports=r},452:function(t,e,n){"use strict";n.r(e);n(37),n(58),n(29),n(18),n(28),n(67),n(88),n(189);var r=n(0),o=n(413),l=n(123),c=n(415),d=n(416),h={setup:function(){var t=Object(o.a)(),e=Object(l.e)(t),n=e.skills,c=e.people,h=e.selectedSkills,f=e.fetchData,v=e.getPeopleWithSkills,m=e.getLowerLevelChildrenCount;return{skills:n,people:c,selectedSkills:h,peopleWithSkills:Object(r.computed)((function(){return v.value})),lowerLevelChildrenCount:Object(r.computed)((function(){return m.value})),width:0,height:0,radius:0,svg:null,showPeople:!1,fetchData:f,colors:d.b}},watch:{skills:function(t,e){this.initChart(t)}},methods:{initChart:function(){var t=document.querySelector("svg").getBoundingClientRect();this.width=t.width,this.height=t.height,this.radius=this.width/2,this.tree=c.g().size([2*Math.PI,this.radius]).separation((function(a,b){return(a.parent==b.parent?1:2)/a.depth})),this.svg=c.e("svg"),this.g=this.svg.append("g"),this.linkgroup=this.g.append("g").attr("class","links").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5),this.nodegroup=this.g.append("g").attr("stroke-linejoin","round").attr("stroke-width",3),this.updateChart(!1),this.zoom()},updateChart:function(){var animate=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],svg=this.svg,g=this.g,t=this.linkgroup,e=this.nodegroup,n=this.tree,r=this.createNodes;this.root=n(c.c(this.skills));var o=this.root.links(),l=t.selectAll("path").data(o,(function(t){return t.source.data.name+"_"+t.target.data.name}));l.exit().remove(),l.enter().append("path").attr("d",c.d().angle((function(t){return t.x})).radius(.1));var d=c.f().duration(animate?400:0).ease(c.b).on("end",(function(){var t=g.node().getBBox();svg.transition().duration(1e3).attr("viewBox","".concat(t.x," ").concat(t.y," ").concat(t.width," ").concat(t.height))})),h=t.selectAll("path");h.transition(d).attr("d",c.d().angle((function(t){return t.x})).radius((function(t){return t.y})));var f=this.root.descendants().reverse(),v=e.selectAll("g").data(f,(function(t){return t.parent?t.parent.data.name+t.data.name:t.data.name}));v.exit().remove();var m=v.enter().append("g"),k=animate?e.selectAll("g").transition(d):e.selectAll("g");k.attr("transform",(function(t){return"\n          rotate(".concat(180*t.x/Math.PI-90,")\n          translate(").concat(t.y,",0)\n          ")})),r(m)},createNodes:function(t){this.radius,this.lowerLevelChildrenCount,this.height;var e=t.attr("id",(function(t){return"".concat(t.data.label)})).attr("data-name",(function(t){return t.data.name})).attr("class",(function(t){return"node--wrapper"})),n=e.filter((function(t){return!t.people&&!t.data.rootSkill}));Object(d.a)(n,40),Object(d.c)(n,40),Object(d.d)(n),this.skillClickHandler(n);var r=Object(d.e)(e.filter((function(t){return t.data.rootSkill})));Object(d.f)(r,this.updateChart)},togglePeople:function(t){var e=this;document.removeEventListener("keyup",this.togglePeople),this.showPeople=!!t||!this.showPeople,document.querySelector("#radial_chart").classList.toggle("chart--filtered",this.showPeople),t||(this.selectedSkills=[]),console.log(this.selectedSkills),document.querySelectorAll(".node--selected").forEach((function(t){return t.classList.toggle("node--selected",e.selectedSkills.includes(t.getAttribute("id")))}))},skillClickHandler:function(t){var e=this;t.on("click",(function(t,n){t.stopPropagation();var r=e.selectedSkills;t.shiftKey||r.splice(0,r.length),r.includes(n.data.label)?r.splice(r.indexOf(n.data.label),1):r.push(n.data.label),t.currentTarget.classList.toggle("node--selected",r.includes(n.data.label)),0==r.length?e.togglePeople(!1):t.shiftKey?document.addEventListener("keyup",e.togglePeople):e.togglePeople(r.length)}))},zoom:function(){var t=this;this.svg.call(c.h().scaleExtent([.1,10]).on("zoom",(function(e){t.g.attr("transform",e.transform)})))}},mounted:function(){var t=this;this.fetchData(),document.querySelector("#radial_chart").addEventListener("click",(function(e){e.currentTarget==e.target&&e.target.classList.contains("chart--filtered")&&t.togglePeople()}))}},f=h,v=(n(448),n(59)),component=Object(v.a)(f,(function(){var t=this,e=t._self._c;return e("div",[e("div",{attrs:{id:"chart-container"}},[e("svg",{attrs:{id:"radial_chart"}})]),t._v(" "),e("div",{attrs:{id:"tooltip"}}),t._v(" "),e("PeopleWithSkillList")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PeopleWithSkillList:n(441).default})},456:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(413),l=n(123),c={setup:function(){var t=Object(o.a)(),e=Object(l.e)(t).getUserInfo;return{userInfo:Object(r.computed)((function(){return null==e?void 0:e.value}))}}},d=(n(450),n(59)),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return t.userInfo?e("Modal",{scopedSlots:t._u([{key:"header",fn:function(){return[e("h2",[t._v(t._s(t.userInfo.first_name)+" "+t._s(t.userInfo.last_name)+"\n      "),e("span",[t._v(t._s(t.userInfo.title))])])]},proxy:!0},{key:"body",fn:function(){return[e("TreeChart")]},proxy:!0}],null,!1,341585342)}):t._e()}),[],!1,null,"106690f5",null);e.default=component.exports;installComponents(component,{TreeChart:n(442).default,Modal:n(443).default})},535:function(t,e,n){"use strict";n.r(e);n(452);var r={name:"IndexPage"},o=n(59),component=Object(o.a)(r,(function(){var t=this._self._c;return t("div",[t("RadialChart"),this._v(" "),t("Info")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{RadialChart:n(452).default,Info:n(456).default})}}]);