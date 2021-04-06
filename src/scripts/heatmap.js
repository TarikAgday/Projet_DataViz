import { color, interpolate, svg } from "d3";


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

            d3.select("#viz_area_5")
            .append("g")
            .selectAll(".ageGroupSalaries-g")
            .data(data)
            .join("g")
            .attr("class", "ageGroupSalaries-g")
            .append("rect")
            .attr("class", "ageGroupSalaries-rect");

}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} ageGroups The data to be used
 * @param {number} width The width of the diagram
 */

export function updateXScale (xScale, teamsNames, width) {
    // Update X scale
    xScale.domain(teamsNames)
          .range([0,width])
  }
/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, ageGroups, height) {
  // TODO : Update Y scale
  yScale.domain(ageGroups)
        .range([0,height])
}

/**
 *  Draws the X axis at the bottom of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  // TODO : Draw X axis
  let x_axis = d3.axisBottom(xScale)
    d3.select(".x.axis")
      .call(x_axis)

}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  // TODO : Draw Y axis
  let y_axis = d3.axisLeft(yScale)
    d3.select(".y.axis")
      .attr("transform", "translate(" + width +",0)")
      .call(y_axis)
}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
export function rotateXTicks () {
  // TODO : Rotate X axis' ticks
  // Source: http://bl.ocks.org/phoebebright/3061203
  d3.selectAll(".x.axis text")
  .attr("transform", function(d)
      {
        return "translate(" + this.getBBox().height*.05  + ")rotate(-45)";
      })
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, colorScale) {
  // TODO : Set position, size and fill of rectangles according to bound data
  // Largeur en x xScale.bandwidth


        d3.select("#graph-g")
        .selectAll(".ageGroupSalaries-rect")
        .attr("x", function (d) {
          return xScale(d.Club);
        })
        .attr("y", function (d) {
          return yScale(d.Age);
        })
        .attr("fill", function (d) {
          return colorScale(d.Salary);
        })
        .attr("height", function (d) {
          return yScale.bandwidth();
        })
        .attr("width", function (d) {
          return xScale.bandwidth();
        });
}
