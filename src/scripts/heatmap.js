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
var margin = {top: 25, right: 150, bottom: 30, left: 150},
width = 1200 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var svg = d3.select("#viz_area_2")
 .append("svg")
  .attr("width", width + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Labels of row and columns
var clubs = d3.map(data, function(d){return d.Club;}).keys()
var ageGroups = d3.map(data, function(d){return d.Age;}).keys()
console.log("XXX", ageGroups)
  // Build X scales and axis:
var xScale = d3.scaleBand()
.range([ 0, width ])
.domain(ageGroups)
.padding(0.01);
svg.append("g")
.attr("transform", "translate(0,"+ height  + ")")
.call(d3.axisBottom().scale(xScale))
.selectAll("text")
  .attr("transform", "translate(0 0) rotate(0)")

// Build Y scales and axis:
var yScale = d3.scaleBand()
  .range([ height, 0 ])
  .domain(clubs)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft().scale(yScale));

  // Build color scale
  var myColor = d3.scaleLinear()
  .range(["white", "#9b0026"])
  .domain([0,800000])


  // add the rectangles

  d3.select("#viz_area_2")
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

  //add the legend

  initGradient (myColor)
  initLegendBar ()
  drawLegend (0, 550, height, width, "black", myColor)

}


/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
export function initGradient (colorScale) {
  const svg = d3.select('#viz_area_5')

  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0)

  linearGradient.selectAll('stop')
    .data(colorScale.ticks().map((tick, i, nodes) => (
      {
        offset: `${100 * (i / nodes.length)}%`,
        color: colorScale(tick)
      })))
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)
}

/**
 * Initializes the SVG rectangle for the legend.
 */
export function initLegendBar () {
  const svg = d3.select('.heatmap-svg')
  svg.append('rect').attr('class', 'legend bar')
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxis () {
  const svg = d3.select('.heatmap-svg')
  svg
    .append('g')
    .attr('class', 'legend axis')
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
export function drawLegend (x, y, height, width, fill, colorScale) {
  // TODO : Draw the legend
  var leg = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([height, 0])

      d3.select(".legend.axis")
      .append("rect")
      .attr("height", height)
      .attr("width", width)
      .attr("x", x)
      .attr("y", y)
      .attr("fill", fill)

    d3.select(".legend.axis")
      .append("g")
      .attr("transform", "translate(" + x + ", " + y + ")")
      .call(d3.axisLeft(leg)
      .ticks(6)
      );

}