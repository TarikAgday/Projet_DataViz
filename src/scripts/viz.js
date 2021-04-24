
 function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function drawStackedBarChart(data) {
  var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

 
  var stackGen = d3.stack().keys(["M", "D", "F", "GK"]).order(d3.stackOrderNone).offset(d3.stackOffsetNone)

  var stackedSeries = stackGen(data)
  const x = d3.scaleBand().domain(data.map(d => d.club)).range([0, 400])
  var xAxis = d3.axisBottom().scale(x)

  const y = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d.sum; })]).range([180, 0]).range([400, 0]);
  var yAxis = d3.axisLeft().scale(y)




  var svg = d3.select("#viz_area_4")
  var svg = svg.append("g").attr("transform", " translate(200,200)")
  svg.append("g").attr("transform", "translate(50," + 400 + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", -55)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-85)")
    

  svg.append("g")
    .attr("transform", "translate(50)")
    .call(yAxis)
    .selectAll("text")
    .attr("x", 30)
    .attr("transform", "translate(-40)")

  var groups = svg.selectAll("g.cost")
    .attr("transform", "translate(50)")
    .data(stackedSeries)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function (d, i) { return colors[i]; })

  var rect = groups.selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("transform", "translate(50)")
    .attr("x", d => x(d.data.club))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d[1]))
    .attr("height", d => 400 - y(d[1] - d[0]))
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on('mousemove', d => {
      
     var xPosition = d3.mouse(d3.event.target)[0] + 20
     var yPosition =  d3.mouse(d3.event.target)[1]

    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(formatNumber(d[1]-d[0]) + " $")
      })

      

  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(450," + i * 19 + ")"; });

  legend.append("rect")
    .attr("x", 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

  legend.append("text")
    .attr("x",  50)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d, i) {
      switch (i) {
        case 0: return "Goalkeeper";
        case 1: return "Forward";
        case 2: return "Defender";
        case 3: return "Midfielder";

      }
    });

    var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");



  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  svg.append("text")
    .attr("text-anchor", "middle")  
    .text("SALARY");

  svg.append("text") 
    .attr("transform", "translate(460,410)")
    .text("TEAM");

  svg.append("text") 
    .attr("transform", "translate(225,-25)")
    .text("TEAM-SALARY");

}
