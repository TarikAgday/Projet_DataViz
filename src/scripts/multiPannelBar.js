export function drawMultiPannelBar(dataTeams){
    var svg = d3.select("#viz_area_3")

    svg.append("text")
    .attr("x", 600)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .style("font", "36px Lora")
    .style("text-decoration", "bold")
    .text("Number of minutes played by players for each teams")
    .style("font-size", "30px")


    var x = 0, y = 0
    var count = 0
    dataTeams.forEach(function(d, i){
        drawBarChart(d, x, y)
        if (count < 5){
            x+=200
        }else {
            x = 0
            y+=210
            count = -1
        }
        count++
    })
 
    // const color = {
    //     "green": "#24A302",
    //     "blue": "#054385",
    //     "red": "#C60808",
    //     "orange": "#FFA33C"
    // }

    // if (d.Position === "M"){
    //     return color.green
    // } else if (d.Position === "D"){
    //     return color.blue
    // } else if (d.Position === "GK"){
    //     return color.red
    // } else if (d.Position === "F"){
    //     return color.orange
    // }
    const colors = ["#24A302", "#054385", "#C60808", "#FFA33C"]

    var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(500," + (i * 15+350)+ ")"; })

    legend.append("rect")
    .attr("x", 750)
    .attr("width", 12)
    .attr("height", 12)
    .style("fill", function (d, i) { return colors.slice()[i]; });

    legend.append("text")
    .attr("x",  780)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .style("font", "15px Lora")
    .text(function (d, i) {
      switch (i) {
        case 0: return "Midfielder";
        case 1: return "Defender";
        case 2: return "Goalkeeper";
        case 3: return "Forward";

      }
    });
}



export function drawBarChart(data, x_test, y_test){
    const h = 320, w = 250

    var svg = d3.select("#viz_area_3")
    .append("g")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("x", x_test)
    .attr("y", y_test)

    var x = d3.scaleBand().domain(data.Players.map(function(d) {
        return d.Name
    })).range([0, 160])

    var y = d3.scaleLinear().range([120, 0])
    .domain([0, d3.max(data.Players, function(d){
        return d.Minutes
    })])

    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y).ticks(8)

    svg.append("g")
    .attr("transform", "translate(50," + 200 + ")")
    .call(xAxis)
    .selectAll("text")
    .style("font", "5px times")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".50em")
    .attr("y", 0)
    .attr("x", -35)

    svg.append("text")
    .attr("transform", "translate(20,75)")
    .text("Minutes")
    .style("font", "9px Lora")
    .style("fontWeight","bolder")

    svg.append("text")
    .attr("transform", "translate(204,205)")
    .text("Players")
    .style("font", "9px Lora")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".50em")
    .attr("y", 215)
    .attr("x", -215)


    svg.append("g")
    .attr("transform", "translate(50, 80)")
    .call(yAxis)
    .selectAll("text")
    .style("font", "10px Lora")
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
   .style("font-size", "14px")

   const color = {
       "green": "#24A302",
       "blue": "#054385",
       "red": "#C60808",
       "orange": "#FFA33C"
   }



    svg.append("g")
    .selectAll(".bar")
    .data(data.Players)
    .enter()
    .append("rect")
    .join("g")
    .attr("class", "bar")
    .attr("x", function(d){
        console.log("drawing stuff")
        console.log(d)
        return x(d.Name)
    })
    .attr("y", function(d){
        return h-y(d.Minutes)
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d){ return y(d.Minutes)})
    .attr("transform", "translate(50," + -120 + ")")
    .attr("style", "outline: thin white;")   
    .style("fill", function(d){
        if (d.Position === "M"){
            return color.green
        } else if (d.Position === "D"){
            return color.blue
        } else if (d.Position === "GK"){
            return color.red
        } else if (d.Position === "F"){
            return color.orange
        }
    })
    .on("mouseover",  function(d) { return tip.show(d,this) })
    .on("mouseout",  function(d) { tip.hide(this) })

    // Function to generate tooltip
const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
svg.call(tip)


// Get content of Rectangle tooltip
function getContents (d) {
  let content =  '</span><bold> Name : </bold><span style="font-weight: normal">' + d.Name 
  +     '<span> <br>Minutes:  <span style="font-weight: normal">' + d.Minutes
  +     '<span> <br>Position:  <span style="font-weight: normal">' 
  if (d.Position === "M") {
    content+= "Midfielder"
  } else if (d.Position === "D") {
    content+= "Defender"
  } else if (d.Position === "GK") {
    content+= "GoalKeeper"
  } else if (d.Position === "F") {
    content+= "Forward"
  }

  return content
}



}



