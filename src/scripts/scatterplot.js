const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
}

let svgSize, graphSize

export function drawScatteredPlotChart(data) {
    setSizing()

    const g = generateG()

    appendAxes(g)
    appendGraphLabels(g)
    positionLabels(g)
    
    const firstPos = d3.min(data, function (d) { return d.pos })
    const lastPos = d3.max(data, function (d) { return d.pos })
    
    const xScale = d3.scaleLinear()
    .domain([firstPos, lastPos])
    .range([graphSize.width, 0])
    
    const maxBudget = 25000000
    
    const yScale = d3.scaleLinear()
    .domain([0, maxBudget])
    .range([graphSize.height, 0])
    
    drawXAxis(xScale)
    drawYAxis(yScale)

    const budgetAverage = data.map(d => d.budget).reduce((a, c) => a + c) / data.length
    console.log(budgetAverage)
    console.log(data)

    g.append("text")
        .attr("x", xScale(21.5))
        .attr("y", yScale(11800000))
        .text("Budget moyen pour la ligue: " + d3.format(".3s")(budgetAverage) + "$")

    g.append("line")
        .attr("x1", 0)
        .attr("x2", graphSize.width)
        .attr("y1", yScale(budgetAverage))
        .attr("y2", yScale(budgetAverage))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4")

    g.append("text")
        .attr("x", xScale(16))
        .attr("y", yScale(25250000))
        .attr("fill", "orange")
        .text("Accès aux playoffs")

    g.append("line")
        .attr("x1", xScale(14))
        .attr("x2", xScale(14))
        .attr("y1", yScale(0))
        .attr("y2", yScale(maxBudget))
        .attr("stroke", "orange")
        .attr("stroke-dasharray", "4")

    const circles = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")

    circles.attr("cx", function (d) { return xScale(d.pos) })
        .attr("cy", function (d) { return yScale(d.budget) })
        .attr("r", 5)
        .attr("fill", "black")
}

function generateG() {
    return d3.select('#viz_area')
        .append('g')
        .attr('id', 'scatter-plot')
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')')
}

function appendAxes(g) {
    g.append('g')
        .attr('class', 'x axis')

    g.append('g')
        .attr('class', 'y axis')
}

function drawXAxis (xScale) {
    d3.select('.x.axis')
      .attr('transform', 'translate( 0, ' + graphSize.height + ')')
      .call(d3.axisBottom(xScale).ticks(24))
}

function appendGraphLabels (g) {
    g.append('text')
      .text('Budget ($)')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
      .attr('font-size', 20)
  
    g.append('text')
      .text('Classement')
      .attr('class', 'x axis-text')
      .attr('font-size', 20)
  }

const formatValue = d3.format(".2s")

function drawYAxis (yScale) {
    const yAxis = d3.axisLeft(yScale).tickFormat(function(d) { return formatValue(d).replace("M", "M$") })

    d3.select('.y.axis')
      .call(yAxis)
  }

function positionLabels (g) {
    g.select('.x.axis-text')
    .attr('x', graphSize.width / 2)
    .attr('y', graphSize.height + 50)
    
    g.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', graphSize.height / 2)
  }

function setSizing() {
    svgSize = {
        width: 1200,
        height: 1200
    }

    graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
    }
}