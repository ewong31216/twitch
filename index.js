var dataFiles = ['brand','products','recipes'];
$.each(dataFiles, function(i, file) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", 'data/' + file + '.js?v=' + Math.random());
    document.getElementsByTagName("head")[0].appendChild(script);
});
var script = document.createElement('script');
script.setAttribute("type", "text/javascript");
script.setAttribute("src", 'main.js?v=' + Math.random());
document.getElementsByTagName("head")[0].appendChild(script);
