export function drawMultiPannelBar(dataTeams){
    var x = 0, y = 0
    var count = 0
    dataTeams.forEach(function(d, i){
        console.log(i)
        console.log(d)
        drawBarChart(d, x, y)
        if (count < 3){
            x+=400
        }else {
            x = 0
            y+=400
            count = 0
        }
        count++
    })
}

export function drawBarChart(data, x_test, y_test){
    const h = 400, w = 400
    var margin = {top: 5, right: 5, bottom: 5, left: 5}

    var svg = d3.select("#viz_area_5")
    .append("g")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("x", x_test)
    .attr("y", y_test)

    var x = d3.scaleBand().domain(data.Players.map(function(d) {
        return d.Name
    })).range([0, 350])

    var y = d3.scaleLinear().range([255, 0])
    .domain([0, d3.max(data.Players, function(d){
        return d.Minutes
    })])

    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y)

    svg.append("g")
    .attr("transform", "translate(50," + 280 + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".35em")
    .attr("y", 0)
    .attr("x", -65)


    svg.append("g")
    .attr("transform", "translate(50, 24)")
    .call(yAxis)
    .selectAll("text")
    .attr("x", 30)
    .attr("transform", "translate(-40)")

    var y = d3.scaleLinear().range([0, 255])
    .domain([0, d3.max(data.Players, function(d){
        return d.Minutes
    })])

    svg.append("g")
    .selectAll(".bar")
    .data(data.Players)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ 
        return x(d.Name)
    })
    .attr("y", function(d){ 
        return h-y(d.Minutes)
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d){ return y(d.Minutes)})
    .attr("transform", "translate(50," + -120 + ")")
    .style("fill", function(d){
        if (d.Position === "M"){
            return "#b33040"
        } else if (d.Position === "D"){
            return "#d25c4d"
        } else if (d.Position === "GK"){
            return "#f2b447"
        } else if (d.Position === "F"){
            return "#d9d574"
        }
    })


    
    // var svg = d3.select("#viz_area_5")
    // .append("g")
    // .append("svg")
    // .append("rect")
    // .attr("width", w)
    // .attr("height", h)
    // .attr("x", 400)
    // .attr("y", 0)
    // .style("fill", "black")
}

