import { color, interpolate, svg } from "d3";
import { getClubsNames } from "./preprocess";


/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  // TODO : Set domain of color scale
  let min = 0
  let max = 0
  for (let index = 0; index < data.length; index++) {
      const element = data[index].Salary;
      if (element > max)
          max = element
  }
    colorScale.domain([min,max])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendHeatMap (data) {
  // TODO : Append SVG rect elements
  // Ajoutez la structure SVG et liez-y les données (fonction appendRects).
  // Cette structure sera utilisée
  // pour dessiner la carte de chaleur dans les étapes suivantes.

  // set the dimensions and margins of the graph
var margin = {top: 25, right: 30, bottom: 30, left: 150},
width = 800 ,
height = 590 - margin.top - margin.bottom;

var svg = d3.select("#viz_area_5")
 .append("svg")
  .attr("width", width + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Labels of row and columns
var clubs = d3.map(data, function(d){return d.Club;}).keys()
var ageGroups = d3.map(data, function(d){return d.Age;}).keys()

  // Build X scales and axis:
var xScale = d3.scaleBand()
.range([ 0, width ])
.domain(ageGroups)
.padding(0.01);
svg.append("g")
.attr("transform", "translate(0,"+ height  + ")")
.call(d3.axisBottom().scale(xScale))
.selectAll("text")
  .attr("transform", "translate(-10 20) rotate(-90)")

// Build Y scales and axis:
var yScale = d3.scaleBand()
  .range([ height, 0 ])
  .domain(clubs)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft().scale(yScale));

  // Build color scale
var myColor = d3.scaleLinear()
.domain([0,1000000000])
.range(["white", "#69b3a2"])

  // create a tooltip
  var tooltip = d3.select("#viz_area_5")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "blue")
    .style("padding", "1px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.ageGroupSalary)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
  }

  // add the rectangles

  d3.select("#viz_area_5")
  .selectAll(".salary-g")
  .data(data)
  .join("g")
  .attr("class", "salary-g")
  .append("rect")
  .attr("class", "salary-rect")
  .attr("x", function (d) {
      return xScale(d.Age);
    })
  .attr("y", function (d) {
      return yScale(d.Club);
    })
  .attr("width", function (d) {
      return xScale.bandwidth();
    })
  .attr("height", function (d) {
      return yScale.bandwidth();
    })
  .attr("fill", function (d) {
      return myColor(d.ageGroupSalary);})
  .attr("transform", "translate( "+ margin.left +" 25)")

}
