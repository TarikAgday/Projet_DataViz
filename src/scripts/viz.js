const height = 600, width = 800
 function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function drawStackedBarChart(data) {
  var colors = ["#C60808", "#FFA33C", "#24A302", "#054385"];

  var stackGen = d3.stack().keys(["M", "D", "F", "GK"]).order(d3.stackOrderNone).offset(d3.stackOffsetNone)

  var stackedSeries = stackGen(data)
  const x = d3.scaleBand().domain(data.map(d => d.club)).range([0, width])
  var xAxis = d3.axisBottom().scale(x)

  const y = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d.sum; })]).range([height, 0]).range([height, 0]);
  var yAxis = d3.axisLeft().scale(y)




  var svg = d3.select("#viz_area_4")
  var svg = svg.append("g").attr("transform", " translate(300,100)")
  svg.append("g").attr("transform", "translate(50," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("font", "20px Lora")
    .attr("y", 0)
    .attr("x", -120)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-85)")


  svg.append("g")
    .attr("transform", "translate(50)")
    .call(yAxis)
    .selectAll("text")
    .style("font", "30px Lora")
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
    .attr("height", d => height - y(d[1] - d[0]))
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on('mousemove', d => {

     var xPosition = d3.mouse(d3.event.target)[0] - 27
     var yPosition =  d3.mouse(d3.event.target)[1]

    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(formatNumber(d[1]-d[0]) + " $").style("font", "25px Lora")
      })



  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(160," + i * 25+ ")"; });

  legend.append("rect")
    .attr("x", 750)
    .attr("width", 24)
    .attr("height", 24)
    .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

  legend.append("text")
    .attr("x",  780)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .style("font", "30px Lora")
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
    .attr("transform", "translate(-10,-20)")
    .style("font", "30px Lora")
    .text("SALARY");

  svg.append("text")
    .attr("transform", "translate(880," + height+ ")")
    .style("font", "30px Lora")
    .text("TEAM");

  svg.append("text")
    .attr("transform", "translate(450,-30)")
    .style("font", "30px Lora")
    .text("TEAM-SALARY");

}
