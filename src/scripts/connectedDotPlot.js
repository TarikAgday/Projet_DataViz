/**
 * Draw the Connected dot plot
 *
 * @param {{}} data the data used to draw the bubble chart
 */
export function appendConnectedDotPlot (data) {
  var teamsByStandings = ['Los Angeles FC', 'NYCFC', 'Atlanta', 'Seattle',
    'Philadelphia', 'Real Salt Lake', 'Minnesota', 'LA Galaxy', 'Toronto FC',
    'DC United', 'Portland', 'FC Dallas', 'NY Red Bulls', 'New England', 'San Jose',
    'Colorado', 'Chicago', 'Montreal', 'Houston', 'Sporting KC',
    'Columbus', 'Orlando City', 'Vancouver', 'FC Cincinnati']

  // set the dimensions and margins of the graph
  var margin = { top: 150, right: 150, bottom: 60, left: 150 }
  var width = 1100 - margin.left - margin.right
  var height = 800 - margin.top - margin.bottom

  // append the svg object to the body of the page
  var svg = d3.select('#viz_area_6')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')

  // Viz title
  svg.append('text')
    .attr('x', (width / 2) + 200)
    .attr('y', 0 - (margin.top / 10))
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .style('text-decoration', 'underline')
    .text('Gaps between goals scored and goals conceided')

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])
  svg.append('g')
    .attr('transform', 'translate(200,' + height + ')')
    .style('font', '22px Lora')
    .call(d3.axisBottom(x))

  // Y axis
  var y = d3.scaleBand()
    .range([0, height])
    .domain(teamsByStandings)
    .padding(1)
  svg.append('g')
    .attr('transform', 'translate(200, 0)')
    .style('font', '22px Lora')
    .call(d3.axisLeft(y))

  // Lines
  svg.selectAll('myline')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', function (d) { return x(d.values[0]) + 200 })
    .attr('x2', function (d) { return x(d.values[1]) + 200 })
    .attr('y1', function (d) { return y(d.Club) })
    .attr('y2', function (d) { return y(d.Club) })
    .attr('stroke', 'grey')
    .attr('stroke-width', '5px')
    .on('mouseover', function (d) { return tip.show(d, this) })
    .on('mouseout', function (d) { tip.hide(this) })

  // Circles of goals scored
  svg.selectAll('mycircle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) { return x(d.values[0]) + 200 })
    .attr('cy', function (d) { return y(d.Club) })
    .attr('r', '10')
    .style('fill', '#0000ff')
    .on('mouseover', function (d) { return tip.show(d, this) })
    .on('mouseout', function (d) { tip.hide(this) })

  // Circles goals conceided
  svg.selectAll('mycircle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) { return x(d.values[1]) + 200 })
    .attr('cy', function (d) { return y(d.Club) })
    .attr('r', '10')
    .style('fill', '#ff0000')
    .on('mouseover', function (d) { return tip.show(d, this) })
    .on('mouseout', function (d) { tip.hide(this) })

  // Legend
  var size = 20
  var allgroups = ['Goals scored', 'Goals conceided']
  svg.append('g')
    .selectAll('mylegend')
    .data(allgroups)
    .enter()
    .append('circle')
    .attr('class', 'circlesLeg')
    .attr('cx', 1200)
    .attr('cy', function (d, i) { return 395 + (i * (size + 5) + (size / 2)) }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr('r', '10')
    .style('fill', 'red')
    .style('stroke', 'black')

  // Axis titles
  svg.append('text')
    .attr('transform', 'translate(550,650)')
    .style('font', '32px Lora')
    .text('Goals')

  svg.append('text')
    .attr('transform', 'translate(0,550) rotate(-90)')
    .style('font', '22px Lora')
    .text('Teams by ordered by general ranking, from top to bottom')

  // Function to generate tooltip
  const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
  svg.call(tip)

  // Get content of Rectangle tooltip
  /**
   * @param {{}} d the player and its information
   * @returns {string} the msg in the toolip
   */
  function getContents (d) {
    return '</span><bold> Club : </bold><span style="font-weight: normal">' + d.Club +
      '<span> <br>Goals scored :  <span style="font-weight: normal">' + d.values[0] +
      '<span> <br>Goals against :  <span style="font-weight: normal">' + d.values[1]
  }
  drawConnectedDotPlotLegend()
}

/**
 *
 */
export function drawConnectedDotPlotLegend () { // Legend
  var size = 20
  var allgroups = ['Goals scored', 'Goals conceided']
  var color = ['blue', 'red']
  var svg = d3.select('#viz_area_6')
  svg.append('g')
    .selectAll('mylegend')
    .data(color)
    .enter()
    .append('circle')
    .attr('class', 'circlesLeg')
    .attr('cx', 1200)
    .attr('cy', function (d, i) { return 395 + (i * (size + 5) + (size / 2)) }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr('r', '10')
    .style('fill', function (d, i) { return d })

  // Add labels beside legend dots
  svg.append('g')
    .attr('class', 'legend text')
    .selectAll('mylabels')
    .append('g')
    .data(allgroups)
    .enter()
    .append('text')
    .attr('x', 1200 + size * 0.8)
    .attr('y', function (d, i) { return 400 + (i * (size + 5) + (size / 2)) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style('fill', 'black')
    .text(function (d) { return d })
    .attr('text-anchor', 'left')
    .style('font-size', '22px')
    .style('alignment-baseline', 'middle')
    .on('click', function (d, i) {
      d3.selectAll('.dot' + d)// .filter(function(d) { return d. == "for_bath"; })
        .style('fill', 'red')
    })
    .on('click', function (d, i) {
      d3.selectAll('.dot' + d)
        .style('fill', 'white')
    })
}
