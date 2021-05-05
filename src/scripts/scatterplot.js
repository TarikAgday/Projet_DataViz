const margin = {top: 50, right: 150, bottom: 30, left: 250}

let svgSize, graphSize

let currentSetting = "general"

let xScale, yScale

const cutoff = 14
const maxBudget = 25000000

export function drawScatteredPlotChart(data) {
    setSizing()

    const firstPos = d3.min(data, function (d) { return d.pos })
    const lastPos = d3.max(data, function (d) { return d.pos })

    xScale = d3.scaleLinear()
    .domain([firstPos, lastPos])
    .range([graphSize.width, 0])

    yScale = d3.scaleLinear()
    .domain([0, maxBudget])
    .range([graphSize.height, 0])

    const budgetAverage = data.map(d => d.budget).reduce((a, c) => a + c) / data.length

    const g = generateG()

    const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
    g.call(tip)

    g.append("rect")
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', xScale(cutoff))
        .attr('height', yScale(budgetAverage))
        .attr('fill', 'red')
        .attr('fill-opacity', '0.1')

    g.append("rect")
        .attr('x', xScale(cutoff))
        .attr('y', yScale(budgetAverage))
        .attr('width', graphSize.width - xScale(cutoff))
        .attr('height', graphSize.height - yScale(budgetAverage))
        .attr('fill', 'green')
        .attr('fill-opacity', '0.1')

    g.append("rect")
        .attr('x', 0)
        .attr('y', yScale(budgetAverage))
        .attr('width', xScale(cutoff))
        .attr('height', graphSize.height - yScale(budgetAverage))
        .attr('fill', 'orange')
        .attr('fill-opacity', '0.2')

    g.append("rect")
        .attr('x', xScale(cutoff))
        .attr('y', 0)
        .attr('width', graphSize.width - xScale(cutoff))
        .attr('height', yScale(budgetAverage))
        .attr('fill', 'yellow')
        .attr('fill-opacity', '0.1')

    appendAxes(g)
    appendGraphLabels(g)
    positionLabels(g)

    drawXAxis(xScale)
    drawYAxis(yScale)

    g.append("text")
        .attr("x", xScale(21.5))
        .attr("y", yScale(11800000))
        .text("Average league budget: " + d3.format(".3s")(budgetAverage) + "$")
        .style("font", "22px Lora")

    g.append("line")
        .attr("x1", 0)
        .attr("x2", graphSize.width)
        .attr("y1", yScale(budgetAverage))
        .attr("y2", yScale(budgetAverage))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4")

    g.append("text")
        .attr("x", xScale(15.4))
        .attr("y", yScale(25250000))
        .attr("fill", "black")
        .text("Playoff access")
       .style("font", "22px Lora")

    g.append("line")
        .attr("x1", xScale(cutoff))
        .attr("x2", xScale(cutoff))
        .attr("y1", yScale(0))
        .attr("y2", yScale(maxBudget))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4")

    const images = g.selectAll("image")
        .data(data)
        .enter()
        .append("image")

    images.attr("x", function (d) { return xScale(d.pos) - 15 })
        .attr("y", function (d) { return yScale(d.budget) })
        .attr("width", 32)
        .attr("height", 32)
        .attr("href", function(d) { return d.src })
        .on("mouseover",  function(d) { return tip.show(d,this) })
        .on("mouseout",  function(d) { tip.hide(this) })

    drawLegend(g)
    drawButton(g)
}

function generateG() {
    return d3.select("#viz_area_1")
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
    .style("font", "20px Lora")
}

function appendGraphLabels (g) {
    g.append('text')
      .text('Budget ($)')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
      .style("font", "32px Lora")

    g.append('text')
      .text('Standing')
      .attr('class', 'x axis-text')
      .style("font", "32px Lora")
  }

const formatValue = d3.format(".2s")

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function drawYAxis (yScale) {
    const yAxis = d3.axisLeft(yScale).tickFormat(function(d) { return formatValue(d).replace("M", "M$") })

    d3.select('.y.axis')
      .call(yAxis).style("font", "20px Lora")
  }

function positionLabels (g) {
    g.select('.x.axis-text')
    .attr('x', graphSize.width / 2)
    .attr('y', graphSize.height + 50)

    g.select('.y.axis-text')
    .attr('x', -80)
    .attr('y', graphSize.height / 2)
  }

function setSizing() {
    svgSize = {
        width: 1300,
        height: 800
    }

    graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
    }
}

function getContents (d) {
    return '<span> Club :  <span style="font-weight: normal">' + d.club
    +
    '</span><br><bold>Budget : </bold><span style="font-weight: normal">' + formatNumber(d.budget)
    + ' $</span>'
}

function drawLegend(g) {
    g.append('rect')
    .attr('width', 30)
    .attr('height', 30)
    .attr('fill', 'rgba(255,0,0,0.1)')
    .attr('stroke', 'black')
    .attr("transform", `translate(${graphSize.width + 20}, ${graphSize.height / 2})`)

    g.append('rect')
    .attr('width', 30)
    .attr('height', 30)
    .attr('fill', 'rgba(255,165,0,0.2)')
    .attr('stroke', 'black')
    .attr("transform", `translate(${graphSize.width + 20}, ${graphSize.height / 2 + 35})`)

    g.append('rect')
    .attr('width', 30)
    .attr('height', 30)
    .attr('fill', 'rgba(255,255,0,0.1)')
    .attr('stroke', 'black')
    .attr("transform", `translate(${graphSize.width + 20}, ${graphSize.height / 2 + 70})`)

    g.append('rect')
    .attr('width', 30)
    .attr('height', 30)
    .attr('fill', 'rgba(0,128,0,0.1)')
    .attr('stroke', 'black')
    .attr("transform", `translate(${graphSize.width + 20}, ${graphSize.height / 2 + 105})`)

    g.append('text')
    .attr("transform", `translate(${graphSize.width + 60}, ${graphSize.height / 2 + 24})`)
    .style("font", "26px Lora")
    .text('Terrible')

    g.append('text')
    .attr("transform", `translate(${graphSize.width + 60}, ${graphSize.height / 2 + 59})`)
    .style("font", "26px Lora")
    .text('Bad')

    g.append('text')
    .attr("transform", `translate(${graphSize.width + 60}, ${graphSize.height / 2 + 94})`)
    .style("font", "26px Lora")
    .text('Okay')

    g.append('text')
    .attr("transform", `translate(${graphSize.width + 60}, ${graphSize.height / 2 + 129})`)
    .style("font", "26px Lora")
    .text('Good')

    g.append('text')
    .attr("transform", `translate(${graphSize.width + 20}, ${graphSize.height / 2 - 20})`)
    .style("font", "26px Lora")
    .text('Legend')
}

function drawButton (g) {
    const button = g.append('g')
      .attr('class', 'button')
      .attr('transform', `translate(${graphSize.width + 20}, ${graphSize.height / 2 + 180})`)
      .attr('width', 130)
      .attr('height', 40)
      .on('click', () => {
        const previousSetting = currentSetting
        currentSetting = (currentSetting === "general" ? "playoff" : "general")
        moveTeams(g)
        d3.select('.button').select('.button-text').text(`See ${previousSetting} standings`)
      })

    button.append('rect')
      .attr('width', 180)
      .attr('height', 70)
      .attr('fill', '#f4f6f4')
      .on('mouseenter', function () {
        d3.select(this).attr('stroke', '#362023')
      })
      .on('mouseleave', function () {
        d3.select(this).attr('stroke', '#f4f6f4')
      })

    button.append('text')
      .attr('x', 87)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'button-text')
      .text('See playoff standings')
      .attr('font-size', '20px')
      .attr('fill', '#362023')
}

function moveTeams(g) {
    const images = g.selectAll("image")

    images.transition()
        .duration(1000)
        .attr("x", function (d) { return xScale(currentSetting === "general" ? d.pos : d.playoffPos) - 15 })
  }