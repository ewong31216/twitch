(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,a){e.exports=a(259)},125:function(e,t,a){},127:function(e,t,a){},259:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(49),o=a.n(r),l=(a(125),a(50)),i=a(51),s=a(59),u=a(52),d=a(58),m=a(13),h=a(71),p=a.n(h),b=(a(127),a(263)),f=a(260),v=a(257),y=a(258),E=a(108),k=a(261),O=function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"getRandomColor",value:function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}},{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=t.dataKeys;return!!a&&c.a.createElement(b.a,{width:800,height:600,data:a,margin:{top:60,right:20,bottom:5,left:0}},n.map(function(t){return c.a.createElement(f.a,{type:"monotone",connectNulls:!0,dataKey:t,stroke:e.getRandomColor(),key:t})}),c.a.createElement(v.a,{dataKey:"date"}),c.a.createElement(y.a,null),c.a.createElement(E.a,{wrapperStyle:{top:0}}),c.a.createElement(k.a,null))}}]),t}(n.Component),g=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).toggleMenu=a.toggleMenu.bind(Object(m.a)(Object(m.a)(a))),a.applyFilter=a.applyFilter.bind(Object(m.a)(Object(m.a)(a))),a.chart=a.chart.bind(Object(m.a)(Object(m.a)(a))),a.filter=a.filter.bind(Object(m.a)(Object(m.a)(a))),a.processData=a.processData.bind(Object(m.a)(Object(m.a)(a))),a.onChange=a.onChange.bind(Object(m.a)(Object(m.a)(a))),a.onUpdate=a.onUpdate.bind(Object(m.a)(Object(m.a)(a))),a.index={date:0,visit:2,visitScore:3,home:4,homeScore:5},a.state={textarea:!1,data:!1,dataValid:!1,chartData:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"toggleMenu",value:function(e){var t=p()(".drop-down-menu."+e);t.hasClass("show")?t.removeClass("show"):(p()(".drop-down-menu").removeClass("show"),t.addClass("show")),this.applyFilter()}},{key:"applyFilter",value:function(){var e=this,t={},a=[],n=[],c=[];this.state.data.dates.map(function(e){return t[e]=[]}),document.querySelectorAll(".drop-down-menu.type input[type=checkbox]:checked").forEach(function(e){a.push(e.value)}),document.querySelectorAll(".drop-down-menu.teams input[type=checkbox]:checked").forEach(function(n){var r=n.value,o=e.state.data.teams[r];o&&(c.push(r),Object.keys(o).map(function(e){var n=o[e];n&&-1!==a.indexOf(n.type)&&t[e].push({team:r,score:n.score})}))}),Object.keys(t).forEach(function(e){var a=t[e],c={date:e};a.map(function(e){c[e.team]=e.score}),n.push(c)}),c.length&&this.setState({chartData:{dataKeys:c,data:n}})}},{key:"chart",value:function(){return!!this.state.chartData&&c.a.createElement(O,this.state.chartData)}},{key:"filter",value:function(){var e=this;return!!this.state.dataValid&&c.a.createElement("div",{className:"filter"},c.a.createElement("span",null,c.a.createElement("strong",null,"Filter:")," "),c.a.createElement("div",{className:"item"},c.a.createElement("span",{onClick:function(){return e.toggleMenu("teams")}},"Select Teams"),c.a.createElement("div",{className:"drop-down-menu teams"},Object.keys(this.state.data.teams).sort().map(function(e){return c.a.createElement("label",{className:"team",key:e},c.a.createElement("input",{type:"checkbox",value:e})," ",e)}))),c.a.createElement("div",{className:"item"},c.a.createElement("span",{onClick:function(){return e.toggleMenu("type")}},"Select Type"),c.a.createElement("div",{className:"drop-down-menu type"},c.a.createElement("label",{className:"type"},c.a.createElement("input",{type:"checkbox",value:"home",defaultChecked:!0})," Home"),c.a.createElement("label",{className:"type"},c.a.createElement("input",{type:"checkbox",value:"visit",defaultChecked:!0})," Visit"))),c.a.createElement("br",{clear:"all"}))}},{key:"processData",value:function(e){var t=this;if(e&&e.length){var a=e.split("\n"),n=a.shift().split(","),c=[],r={};return a.forEach(function(e){var a=e.split(","),n=a[t.index.date],o=a[t.index.visit],l=a[t.index.visitScore],i=a[t.index.home],s=a[t.index.homeScore];n&&(-1===c.indexOf(n)&&c.push(n),o&&l&&(r[o]||(r[o]={}),r[o][n]={type:"visit",score:l}),i&&s&&(r[i]||(r[i]={}),r[i][n]={type:"home",score:s}))}),{labels:n,dates:c.sort(),teams:r}}}},{key:"onChange",value:function(e){this.setState({textarea:e.target.value})}},{key:"onUpdate",value:function(){var e=this.processData(this.state.textarea);e?this.setState({data:e,dataValid:!0}):this.setState({dataValid:!1,chartData:!1})}},{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(this.chart,null),c.a.createElement(this.filter,null),c.a.createElement("textarea",{className:"data-input",onChange:this.onChange}),c.a.createElement("button",{className:"data-update",onClick:this.onUpdate},"Update Data"))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[120,2,1]]]);
//# sourceMappingURL=main.2a27d621.chunk.js.map