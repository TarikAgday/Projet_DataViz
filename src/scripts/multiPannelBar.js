export function drawMultiPannelBar(dataTeams){
    var x = 0, y = 0
    var count = 0
    dataTeams.forEach(function(d, i){
        drawBarChart(d, x, y)
        if (count < 5){
            x+=200
        }else {
            x = 0
            y+=200
            count = -1
        }
        count++
    })
}

export function drawBarChart(data, x_test, y_test){
    const h = 320, w = 250
    var margin = {top: 5, right: 5, bottom: 5, left: 5}

    var svg = d3.select("#viz_area_3")
    .append("g")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("x", x_test)
    .attr("y", y_test)

    var x = d3.scaleBand().domain(data.Players.map(function(d) {
        return d.Name
    })).range([0, 150])

    var y = d3.scaleLinear().range([120, 0])
    .domain([0, d3.max(data.Players, function(d){
        return d.Minutes
    })])

    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y)

    svg.append("g")
    .attr("transform", "translate(50," + 200 + ")")
    .call(xAxis)
    .selectAll("text")
    .style("font", "5px times")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".35em")
    .attr("y", 0)
    .attr("x", -35)


    svg.append("g")
    .attr("transform", "translate(50, 80)")
    .call(yAxis)
    .selectAll("text")
    .attr("x", 30)
    .attr("transform", "translate(-40)")

    var y = d3.scaleLinear().range([0, 120])
    .domain([0, d3.max(data.Players, function(d){
        return d.Minutes
    })])

    //Viz title
   svg.append("text")
   .attr("x", 125)
   .attr("y", 75)
   .attr("text-anchor", "middle")
   .style("font", "36px Lora")
   .style("text-decoration", "bold")
   .text(data.Team)
   .style("font-size", "10px")


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
}

