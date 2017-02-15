(() => {
    let jsonCircles = [
        { "x_axis": 30, "y_axis": 30, "radius": 20, "color": "green" },
        { "x_axis": 70, "y_axis": 70, "radius": 20, "color": "purple" },
        { "x_axis": 110, "y_axis": 100, "radius": 20, "color": "red" }
    ];

    let trans = d3.transition()
        .duration(1500)
        .ease(d3.easeLinear);

    let drag = d3.drag().on("drag", function(d, i) {
        d.x = (d.x || 0) + d3.event.dx
        d.y = (d.y || 0) + d3.event.dy
        d3.select(this).attr("transform", function(d, i) {
            return "translate(" + [d.x, d.y] + ")"
        });
    });

    let zoom = d3.zoom().on('zoom', function() {
        cnt.attr("transform", "scale(" + d3.event.transform.k + ")");
    })

    let svgContainer = d3.select("body").append("svg")
        .attr("width", 200)
        .attr("height", 200).call(zoom);

    let cnt = svgContainer.append('g');

    let circles = cnt.selectAll("circle")
        .data(jsonCircles)
        .enter()
        .append("circle")
        .call(drag)
        .transition(trans)

    let circleAttributes = circles
        .attr("cx", function(d) {
            return d.x_axis;
        })
        .attr("cy", function(d) {
            return d.y_axis;
        })
        .attr("r", function(d) {
            return d.radius;
        })
        .style("fill", function(d) {
            return d.color;
        });
})()
