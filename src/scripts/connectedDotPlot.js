import d3Tip from 'd3-tip'

// Code source: https://bl.ocks.org/tlfrd/e1ddc3d0289215224a69405f5e538f51
export function appendConnectedDotPlot (data){
  console.log("Coneccted Data", data)
    var teamsByStandings = ["Los Angeles FC","NYCFC","Atlanta","Seattle",
    "Philadelphia", "Real Salt Lake", "Minnesota","LA Galaxy", "Toronto FC",
    "DC United","Portland","FC Dallas","NY Red Bulls","New England","San Jose",
    "Colorado","Chicago",  "Montreal", "Houston", "Sporting KC",
    "Columbus", "Orlando City", "Vancouver","FC Cincinnati"]
// set the dimensions and margins of the graph
var margin = {top: 40, right: 150, bottom: 60, left: 150},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#viz_area_6")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  //Viz title
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top/10))
    .attr("text-anchor", "middle")
    .style("font-size", "28px")
    .style("text-decoration", "underline")
    .text("Gaps between goals scored and goals conceided ordered by teams' rankings");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0,100])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(teamsByStandings)
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y))

  // Lines
  svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.values[0]); })
      .attr("x2", function(d) { return x(d.values[1]); })
      .attr("y1", function(d) { return y(d.Club); })
      .attr("y2", function(d) { return y(d.Club); })
      .attr("stroke", "grey")
      .attr("stroke-width", "5px")
      .on("mouseover",  function(d) { return tip.show(d,this) })
      .on("mouseout",  function(d) { tip.hide(this) })

  // Circles of variable 1
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.values[0]); })
      .attr("cy", function(d) { return y(d.Club); })
      .attr("r", "10")
      .style("fill", "#0000ff")
      .on("mouseover",  function(d) { return tip.show(d,this) })
      .on("mouseout",  function(d) { tip.hide(this) })

  // Circles of variable 2
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.values[1]); })
      .attr("cy", function(d) { return y(d.Club); })
      .attr("r", "10")
      .style("fill", "#ff0000")
      .on("mouseover",  function(d) { return tip.show(d,this) })
      .on("mouseout",  function(d) { tip.hide(this) })

  // Function to generate tooltip
const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
svg.call(tip)

// Get content of Rectangle tooltip
function getContents (d) {
  return '</span><bold> Club : </bold><span style="font-weight: normal">' + d.Club
  +
      '<span> <br>Goals scored :  <span style="font-weight: normal">' + d.values[0]
  +
  '<span> <br>Goals against :  <span style="font-weight: normal">' + d.values[1]

}

}