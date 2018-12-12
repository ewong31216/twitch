(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{179:function(t,e,a){t.exports=a(379)},184:function(t,e,a){},377:function(t,e,a){},379:function(t,e,a){"use strict";a.r(e);var n=a(1),s=a.n(n),r=a(32),i=a.n(r),c=(a(184),a(40)),l=a(19),o=a(20),d=a(23),m=a(21),h=a(22),u=a(11),p=a(113),b=(a(229),a(108)),v=a.n(b),f=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(d.a)(this,Object(m.a)(e).call(this,t))).checkValid=a.checkValid.bind(Object(u.a)(Object(u.a)(a))),a.isValid=a.isValid.bind(Object(u.a)(Object(u.a)(a))),a.onChangeToDate=a.onChangeToDate.bind(Object(u.a)(Object(u.a)(a))),a.onChangeFromDate=a.onChangeFromDate.bind(Object(u.a)(Object(u.a)(a))),a.onGoButton=a.onGoButton.bind(Object(u.a)(Object(u.a)(a))),a.data={dateExp:/^(\d{2}:\d{2}:\d{2}) (\d{1,2})\/(\d{1,2})\/(\d{4})$/},a.state={toDate:new Date,fromDate:new Date,valid:!1},a}return Object(h.a)(e,t),Object(o.a)(e,[{key:"checkValid",value:function(){var t=this.isValid();t!==this.state.valid&&this.setState({valid:t})}},{key:"getDate",value:function(t){if(t){var e=t.match(this.data.dateExp);if(e&&5===e.length)return new Date(e[4]+"-"+e[3]+"-"+e[2]+" "+e[1])}return!1}},{key:"isValid",value:function(){return!(!this.state.fromDate||!this.state.toDate)&&("Invalid Date"!==this.state.fromDate.toString()&&"Invalid Date"!==this.state.toDate.toString())}},{key:"onChangeToDate",value:function(t){this.setState({toDate:new Date(t)},this.checkValid)}},{key:"onChangeFromDate",value:function(t){this.setState({fromDate:new Date(t)},this.checkValid)}},{key:"onGoButton",value:function(){this.state.valid&&this.props.fetchData({toDate:this.state.toDate.toISOString(),fromDate:this.state.fromDate.toISOString()})}},{key:"render",value:function(){return s.a.createElement("div",{className:"date-range"},s.a.createElement("div",{className:"to-date-container"},s.a.createElement("label",{className:"to-date"},"To"),s.a.createElement(p.a,{value:v()(this.state.toDate).format("HH:mm:ss MM/DD/YYYY"),onChange:this.onChangeToDate,showTimeSelect:!0,timeFormat:"HH:mm:ss",timeIntervals:5,dateFormat:"HH:mm:ss MM/dd/yyyy",timeCaption:"time"}),s.a.createElement("br",null),s.a.createElement("div",{className:"helptext"},"(HH:mm:ss MM/DD/YYYY)")),s.a.createElement("div",{className:"from-date-container"},s.a.createElement("label",{className:"from-date"},"From"),s.a.createElement(p.a,{value:v()(this.state.fromDate).format("HH:mm:ss MM/DD/YYYY"),onChange:this.onChangeFromDate,showTimeSelect:!0,timeFormat:"HH:mm:ss",timeIntervals:5,dateFormat:"HH:mm:ss MM/dd/yyyy",timeCaption:"time"}),s.a.createElement("br",null),s.a.createElement("div",{className:"helptext"},"(HH:mm:ss MM/DD/YYYY)")),s.a.createElement("button",{className:"go-button",disabled:!this.state.valid,onClick:this.onGoButton},"Go"))}}]),e}(n.Component),g=a(109),j=a.n(g),O={makeCall:function(t,e,a,n){var s={url:t,type:e||"GET",crossDomain:!0,cache:!1,credentials:!0};return a&&(s.beforeSend=function(t){t.setRequestHeader.apply(t,Object(c.a)(a))}),"POST"===e&&n&&j.a.extend(s,{data:JSON.stringify(n),contentType:"application/json",dataType:"json"}),j.a.ajax(s).then(function(t){return t},function(t){return!1})}},y=a(167),E=a.n(y),D=function(){return s.a.createElement("div",{className:"dot"})},N=function(t){function e(){return Object(l.a)(this,e),Object(d.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){var t=this.props,e=t.current,a=t.data;return!(!a||!a.length)&&s.a.createElement("div",{className:"map-container",style:{height:"600px",width:"600px"}},s.a.createElement(E.a,{bootstrapURLKeys:{key:"AIzaSyB7VapGG60Ch5j7T3jbrlFUvpJRofu2Wak"},defaultCenter:this.props.center,defaultZoom:this.props.zoom},s.a.createElement(D,{lat:a[e].lat,lng:a[e].long})),s.a.createElement("div",{className:"info"},s.a.createElement("div",{className:"speed"},a[e].speed," mph"),s.a.createElement("div",{className:"signal"},s.a.createElement("div",{className:"signal-bar bar-1"+(a[e].rssi>0?" red":"")}),s.a.createElement("div",{className:"signal-bar bar-2"+(a[e].rssi>1?" red":"")}),s.a.createElement("div",{className:"signal-bar bar-3"+(a[e].rssi>2?" red":"")}),s.a.createElement("div",{className:"signal-bar bar-4"+(a[e].rssi>3?" red":"")}))))}}]),e}(n.Component);N.defaultProps={center:{lat:59.95,lng:30.33},zoom:11};var k=N,C=function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(d.a)(this,Object(m.a)(e).call(this,t))).addCurrent=a.addCurrent.bind(Object(u.a)(Object(u.a)(a))),a.toggleStart=a.toggleStart.bind(Object(u.a)(Object(u.a)(a))),a.slower=a.slower.bind(Object(u.a)(Object(u.a)(a))),a.faster=a.faster.bind(Object(u.a)(Object(u.a)(a))),a.data={width:t.width||600,timer:!1},a.state={start:!1,speed:100},a}return Object(h.a)(e,t),Object(o.a)(e,[{key:"addCurrent",value:function(){this.state.start&&this.props.current<this.props.data.length-1?(this.props.updateCurrent(this.props.current+1),this.data.timer=setTimeout(this.addCurrent,this.state.speed)):this.setState({start:!1})}},{key:"toggleStart",value:function(){var t=!this.state.start,e=this;this.setState({start:t},function(){clearTimeout(e.data.timer),t&&e.addCurrent()})}},{key:"slower",value:function(){this.setState({speed:Math.round(2*this.state.speed)})}},{key:"faster",value:function(){this.setState({speed:Math.round(this.state.speed/2)})}},{key:"render",value:function(){var t=this.props,e=t.current,a=t.data,n=e*this.data.width/(a.length||1);return!(!a||!a.length)&&s.a.createElement("div",{className:"slider-container current-line-container"},s.a.createElement("div",{className:"current-line",style:{left:n}}),s.a.createElement("div",{className:"status-bar",style:{width:this.data.width}}),s.a.createElement("div",{className:"controller-buttons"},s.a.createElement("span",{className:"arrow left-arrow",onClick:this.slower},s.a.createElement("div",null),s.a.createElement("div",null)),s.a.createElement("span",{className:"start-pause "+(this.state.start?"pause":"start"),onClick:this.toggleStart},s.a.createElement("div",{className:"start"}),s.a.createElement("div",null)),s.a.createElement("span",{className:"arrow right-arrow",onClick:this.faster},s.a.createElement("div",null),s.a.createElement("div",null))))}}]),e}(n.Component),w=a(382),I=a(380),M=a(376),S=function(t){function e(){return Object(l.a)(this,e),Object(d.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(o.a)(e,[{key:"getRandomColor",value:function(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}},{key:"render",value:function(){var t=this.props,e=t.current,a=t.data,n=t.dataKey,r=this.props.width||400,i=e*(r-60)/(a.length||1)+60,c=this.props.color||this.getRandomColor();return!(!a||!a.length)&&s.a.createElement("div",{className:"graph-container current-line-container"},s.a.createElement("div",{className:"title"},this.props.title),s.a.createElement("div",{className:"current-line",style:{left:i}}),s.a.createElement(w.a,{width:r,height:200,data:a,margin:{top:20,right:0,bottom:5,left:0}},s.a.createElement(I.a,{type:"monotone",connectNulls:!0,dataKey:n,stroke:c,key:n,dot:{r:0}}),s.a.createElement(M.a,null)))}}]),e}(n.Component),Y=(a(377),function(t){function e(t){var a;return Object(l.a)(this,e),(a=Object(d.a)(this,Object(m.a)(e).call(this,t))).processData=a.processData.bind(Object(u.a)(Object(u.a)(a))),a.updateCurrent=a.updateCurrent.bind(Object(u.a)(Object(u.a)(a))),a.fetchData=a.fetchData.bind(Object(u.a)(Object(u.a)(a))),a.data={id:"dd7295fa-6c65-484d-b38d-30df3bc31c0c",lags:[],longs:[]},a.state={current:0,data:[],noData:!1,center:{lat:59.95,lng:30.33}},a}return Object(h.a)(e,t),Object(o.a)(e,[{key:"updateCurrent",value:function(t){isNaN(t)||this.setState({current:t})}},{key:"processData",value:function(t){if(t&&t.length){for(var e=0;e<t.length;e++){var a=t[e-1]?t[e-1].speed:0,n=t[e].speed-a;t[e].acceleration=n,this.data.lags.push(t[e].lat),this.data.longs.push(t[e].long)}this.setState({center:{lat:(Math.max.apply(Math,Object(c.a)(this.data.lags))+Math.min.apply(Math,Object(c.a)(this.data.lags)))/2,lng:(Math.max.apply(Math,Object(c.a)(this.data.longs))+Math.min.apply(Math,Object(c.a)(this.data.longs)))/2}})}return t}},{key:"fetchData",value:function(t){var e=this;O.makeCall("https://alpha.skylo.io/api/devices/history/ids/"+this.data.id+"?since="+t.fromDate+"&until="+t.toDate,"GET",["Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRqYXlAZm9yZC5jb20iLCJzeXN0ZW1Sb2xlIjoic3lzdGVtVXNlciIsImlhdCI6MTU0MTAwNzAzMiwiaXNzIjoiaHR0cDovL3dlYi1zZXJ2ZXJzLWRldi0xNDI1MzI1MDI4LnVzLXdlc3QtMi5lbGIuYW1hem9uYXdzLmNvbSIsInN1YiI6ImUyMmE2MjlkLWRlYTAtNDc0Yi04YzY5LTFlODQwYmZkMzRmYSIsImp0aSI6IjY0Nzk2YWIwLTlhYTItNGY3Ny04OTk4LWI1MzMzYzhlMmI5OCJ9.aIGEX_qigixaA17dcO0KNJay-R_704FDaugfkIAeVLA"]).then(function(t){var a=[];t&&t.devices&&t.devices[e.data.id]&&(a=t.devices[e.data.id]),e.setState({current:0,data:e.processData(a),noData:!a.length})})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"header"},s.a.createElement("div",{className:"title"},"Vehicle Statistics"),s.a.createElement(f,{fetchData:this.fetchData})),!!this.state.noData&&s.a.createElement("h2",null,"No data is returned. Please check your date range and try again!"),s.a.createElement("div",{className:"right-content"},s.a.createElement(S,Object.assign({},this.state,{dataKey:"rssi",color:"#00f",title:"Signal"})),s.a.createElement(S,Object.assign({},this.state,{dataKey:"speed",color:"#0f0",title:"Speed"})),s.a.createElement(S,Object.assign({},this.state,{dataKey:"acceleration",color:"#0ff",title:"Acceleration"}))),s.a.createElement("div",{className:"main-content"},s.a.createElement(k,this.state),s.a.createElement(C,Object.assign({},this.state,{updateCurrent:this.updateCurrent}))))}}]),e}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[179,2,1]]]);
//# sourceMappingURL=main.e0f9a0e4.chunk.js.map