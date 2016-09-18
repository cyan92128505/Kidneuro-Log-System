(function() {

var transition = d3.select({}).transition()
    .duration(750)
    .ease("linear");

chart([1, n - 2], "basis", function tick(path, line, data, x) {
  transition = transition.each(function() {
    data.push(random());
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .attr("transform", "translate(" + x(0) + ")");
    data.shift();

  }).transition().each("start", function() { tick(path, line, data, x); });
});

})();