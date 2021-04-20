
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale(scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale(scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups(data, x) {
  // TODO : Create the groups
  d3.select('#graph-g')
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawStackedBarChart(data) {
  var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];
  let legendCellSize = 20
  let tooltipWidth = 210
  var keys = [...new Set(data.map(d => d["Playing Position"]))]

  // var dataset = d3.stack()(["M", "D", "F", "GK"].map(function(fruit) {
  //   return data.map(function(d) {
  //     return {x: (d.club), y: +d[fruit]};
  //   });
  // }));
  var stackGen = d3.stack().keys(["M", "D", "F", "GK"]).order(d3.stackOrderNone).offset(d3.stackOffsetNone)

  var stackedSeries = stackGen(data)
  const x = d3.scaleBand().domain(data.map(d => d.club)).range([0, 400])
  var xAxis = d3.axisBottom().scale(x)

  const y = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d.sum; })]).range([180, 0]).range([400, 0]);
  var yAxis = d3.axisLeft().scale(y)




  var svg = d3.select("#viz_area_4")

  svg.append("g").attr("transform", "translate(50," + 400 + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 6)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", "translate(50)")
    .call(yAxis)
    .selectAll("text")
    .attr("x", 30)
    .attr("transform", "translate(-40)")

  var groups = svg.selectAll("g.cost")
    .attr("transform", "translate(50)")
    .data(stackedSeries)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function (d, i) { return colors[i]; })

  var rect = groups.selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("transform", "translate(50)")
    .attr("x", d => x(d.data.club))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d[1]))
    .attr("height", d => 400 - y(d[1] - d[0]))
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on('mousemove', d => {
      // Mouse event stuffs again (overwrites above declaration).

    //  console.log(d,d[1] - d[0],"ok")
     var xPosition = d3.mouse(d3.event.target)[0] + 20
     var yPosition =  d3.mouse(d3.event.target)[1]
    //  tooltip
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(d[1]-d[0]) //.attr("x", xPosition  ).attr("y"+ yPosition );
      // console.log( )
      })



  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(450," + i * 19 + ")"; });

  legend.append("rect")
    .attr("x", 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

  legend.append("text")
    .attr("x",  50)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d, i) {
      switch (i) {
        case 0: return "GK";
        case 1: return "F";
        case 2: return "D";
        case 3: return "M";

      }
    });

    var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");



  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
}
