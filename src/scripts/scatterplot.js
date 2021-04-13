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
    
    const firstPos = d3.min(data, function (d) { return d.pos })
    const lastPos = d3.max(data, function (d) { return d.pos })
    
    const xScale = d3.scaleLinear()
    .domain([firstPos, lastPos])
    .range([graphSize.width, 0])
    
    const maxBudget = d3.max(data, function (d) { return d.budget })
    
    const yScale = d3.scaleLinear()
    .domain([0, maxBudget])
    .range([graphSize.height, 0])
    
    drawXAxis(xScale)
    drawYAxis(yScale)

    const circles = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")

    circles.attr("cx", function (d) { return xScale(d.pos) })
        .attr("cy", function (d) { return yScale(d.budget) })
        .attr("r", 5)
        .attr("fill", "black")

    console.log()
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
      .call(d3.axisBottom(xScale))
}

function drawYAxis (yScale) {
    d3.select('.y.axis')
      .call(d3.axisLeft(yScale))
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