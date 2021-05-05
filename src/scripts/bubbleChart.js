/**
 * Draw the pannel bubble chart.
 *
 * @param {{}} dataPosition the data used to draw the bubble chart
 */
export function drawMultiPannelBubble (dataPosition) {
  var x = 50; var y = 75
  var count = 0
  dataPosition.forEach(function (d, i) {
    appendBubbleChart(d, x, y)
    if (count < 1) {
      x += 500
    } else {
      x = 50
      y += 450
      count = -1
    }
    count++
  })
  appendBubbleChartLegend()
  appendBubbleChartTitles()
}

/**
 * Draw the one bubble chart.
 *
 * @param {{}} data the data used to draw the bubble chart
 * @param {number} x the x where to start drawing the bubblechart
 * @param {number} y the ywhere to start drawing the bubblechart
 */
export function appendBubbleChart (data, x, y) {
  var margin = { top: 10, right: 15, bottom: 25, left: 100 }
  var height = 400; var width = 600

  // append the svg object to the body of the page
  var svg = d3.select('#viz_area_5')
    .append('g')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('x', x)
    .attr('y', y)

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  x = d3.scaleLinear()
    .domain([0, 3400])
    .range([0, width - 200])
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).ticks(3))

  y = d3.scaleLinear()
    .range([height - 50, 0])
    .domain([0, d3.max(data.Players, function (d) {
      return (parseInt(d.Performance) * 1.10)
    })])
  svg.append('g')
    .attr('transform', 'translate(' + width + ',0 )')
    .call(d3.axisBottom(x).ticks(3))

  var xAxis = d3.axisBottom().scale(x)
  var yAxis = d3.axisLeft().scale(y)

  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')')
    .call(xAxis)
    .style('font', '20px Lora')

  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + (-margin.bottom + 50) + ')')
    .call(yAxis)
    .style('font', '20px Lora')

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([200000, 1310000000])
    .range([2, 15])

  // Add dots
  console.log('Check ici', data)
  svg.append('g')
    .selectAll('dot')
    .data(data.Players)
    .enter()
    .append('circle')
    .attr('class', function (d) { return 'dot' + d.Club.replace(/\s/g, '-') })
    .attr('cx', function (d) { return x(d.Minutes) + margin.left })
    .attr('cy', function (d) { return y(d.Performance) - margin.bottom + 50 })
    .attr('r', function (d) { return z(d.Salary * 500) })
    .style('fill', 'white')
    .style('opacity', '0.75')
    .style('stroke', 'black')
    .on('mouseover', function (d) { return tip.show(d, this) })
    .on('mouseout', function (d) { tip.hide(this) })

  // Function to generate tooltip
  const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
  svg.call(tip)

  /**
   * Get the content of the toollip
   *
   * @param {{}} d the information of the player
   * @returns {string} the string to dispplay
   */
  function getContents (d) {
    return '</span><bold> Player : </bold><span style="font-weight: normal">' + d.Name +
              '</span><br><bold> Age : </bold><span style="font-weight: normal">' + d.Age +
                  '<span> <br>Club :  <span style="font-weight: normal">' + d.Club +
              '</span><br><bold> Salary : </bold><span style="font-weight: normal">' + formatNumber(d.Salary) + ' $' +
              '</span><br><bold> Performance : </bold><span style="font-weight: normal">' + d.Performance +
              '</span><br><bold> Position : </bold><span style="font-weight: normal">' + d.Position +
              '</span><br><bold> Minutes played : </bold><span style="font-weight: normal">' + d.Minutes
  }

  // Format integers to add comas for millions or thousands values
  /**
   * @param num
   */
  function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
}

/**
 *
 */
export function appendBubbleChartTitles () {
  var allTitles = ['Midfielders', 'Defenders', 'Forwards', 'Goalkeepers']
  // Viz title
  var svg = d3.select('#viz_area_5')
  svg.append('g')
    .selectAll('titles')
    .data(allTitles)
    .enter()
    .append('text')
    .attr('class', 'titles')
    .attr('x', function (d, i) {
      if (i % 2 === 0) { return 300 } else { return 900 }
    })
    .attr('y', function (d, i) {
      if (i < 2) { return 50 } else { return 550 }
    })
    .text(function (d, i) { return d })
    .style('fill', 'black')
    .style('font', '20px Lora')
}

/**
 *
 */
export function appendBubbleChartLegend () {
// https://github.com/wbkd/d3-extended
  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this)
    })
  }
  // Add a scale for bubble color
  var mycolor = d3.scaleOrdinal()
    .domain(['Atlanta United', 'Chicago Fire', 'Colorado Rapids', 'Columbus Crew', 'DC United',
      'FC Cincinnati', 'FC Dallas', 'Houston Dynamo', 'LA Galaxy', 'LAFC',
      'Minnesota United', 'Montreal Impact', 'New England Revolution', 'New York City FC', 'New York Red Bulls',
      'Orlando City', 'Philadelphia Union', 'Portland Timbers', 'Real Salt Lake', 'San Jose Earthquakes',
      'Seattle Sounders', 'Sporting Kansas City', 'Toronto FC', 'Vancouver Whitecaps'])
    .range(['#ff7300', '#ff002b', '#800020', '#ffff00', '#808080',
      '#ffa500', '#1a1aff', '#ffc04d', '#ffd700', '#000000',
      '#87ceeb', '#DADADA', '#00008b', '#c9e9f6', '#ff0000',
      '#9800FF', '#00003f', '#037d50', '#cc0000', '#0000a5',
      '#00FF4C', '#49DBDA', '#FF6347', '#000058'])

  // ---------------------------//
  //       LEGEND               //
  // ---------------------------//

  // Add one dot in the legend for each name.
  var size = 20
  var allgroups = ['Atlanta-United', 'Chicago-Fire', 'Colorado-Rapids', 'Columbus-Crew', 'DC-United',
    'FC-Cincinnati', 'FC-Dallas', 'Houston-Dynamo', 'LA-Galaxy', 'LAFC',
    'Minnesota-United', 'Montreal-Impact', 'New-England-Revolution', 'New-York-City-FC', 'New-York-Red-Bulls',
    'Orlando-City-SC', 'Philadelphia-Union', 'Portland-Timbers',
    'Real-Salt-Lake', 'San-Jose-Earthquakes', 'Seattle-Sounders-FC', 'Sporting-Kansas-City',
    'Toronto-FC', 'Vancouver-Whitecaps']
  var teamChecked = new Array(24).fill(false)
  var svg = d3.select('#viz_area_5')
  svg.append('g')
    .selectAll('mylegend')
    .data(allgroups)
    .enter()
    .append('rect')
    .attr('class', 'rectsLeg')
    .attr('x', 1100)
    .attr('width', 30)
    .attr('y', function (d, i) { return 205 + (i * (size + 5) + (size / 2)) })
    .attr('height', 30)
    .style('fill', 'white')
    .style('stroke', 'black')
    .on('click', function (d, i) {
      console.log('D', d)
      if (!teamChecked[i]) {
        var data = d.replace(/-/g, ' ')
        console.log('data', data, mycolor(data), i, mycolor(i))
        teamChecked[i] = true
        d3.selectAll('.dot' + d)
          .style('fill', function (d, i) { return mycolor(data) })
          .style('opacity', '10')
        d3.select(this).style('fill', function (d, i) { return mycolor(data) })
      } else {
        teamChecked[i] = false
        d3.select(this).style('fill', 'white')
        d3.selectAll('.dot' + d)
          .style('opacity', '0.75').style('fill', 'white')
      }
    }
    )

  // Add labels beside legend dots
  svg.append('g')
    .attr('class', 'legend text')
    .selectAll('mylabels')
    .append('g')
    .data(allgroups)
    .enter()
    .append('text')
    .attr('x', 1120 + size * 0.8)
    .attr('y', function (d, i) { return 220 + (i * (size + 5) + (size / 2)) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style('fill', 'black')
    .text(function (d) { return d.replace(/-/g, ' ') })
    .style('font', '20px Lora')
    .attr('text-anchor', 'left')
    .style('alignment-baseline', 'middle')
}
