// code source https://www.d3-graph-gallery.com/graph/bubble_template.html
// set the dimensions and margins of the graph

export function appendBubbleChart (data) {
var margin = {top: 40, right: 150, bottom: 60, left: 30},
    width = 1200 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#viz_area_3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 3500])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Minutes played");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -30)
      .attr("y", -20 )
      .text("Performance")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([200000, 1310000000])
    .range([ 2, 30]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Atlanta United", "Chicago Fire", "Colorado Rapids", "Columbus Crew", "DC United",
              "FC Cincinnati", "FC Dallas", "Houston Dynamo", "LA Galaxy", "LA Galaxy","LAFC",
              "Minnesota United", "Montreal Impact", "New England Revolution", "New York City FC",
              "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers",
              "Real Salt Lake", "San Jose Earthquakes", "Seattle Sounders FC", "Sporting Kansas City",
              "Toronto FC", "Vancouver Whitecaps" ])
    .range(["#d62728","#ff002b","#800020","#ffff00","#808080","#ffa500","#1a1aff","#ffc04d","#ffd700","#ffe34d",
            "#87ceeb", "#0000ff", "#00008b", "#c9e9f6", "#ff3333", "#800080", "#00003f", "#037d50", "#cc0000", "#0000a5",
            "#00cc00", "#a9a9a9", "#ff0000", "#000058"]);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }



  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "circles-g" )
      .attr("cx", function (d) { return x(d.MinsPlayed); } )
      .attr("cy", function (d) { return y(d.Performance); } )
      .attr("r", function (d) { return z(d.Salary*500); } )
     .style("fill", function (d) { return myColor(d.Club); }  )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

   //  Add legend: circles
    var valuesToShow = ["Atlanta United", "Chicago Fire", "Colorado Rapids", "Columbus Crew", "DC United",
    "FC Cincinnati", "FC Dallas", "Houston Dynamo", "LA Galaxy", "LA Galaxy","LAFC",
    "Minnesota United", "Montreal Impact", "New England Revolution", "New York City FC",
    "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers",
    "Real Salt Lake", "San Jose Earthquakes", "Seattle Sounders FC", "Sporting Kansas City",
    "Toronto FC", "Vancouver Whitecaps" ]
    var xCircle = 390
    var xLabel = 440
   // svg
    //  .selectAll("legend")
    //  .data(valuesToShow)
    //  .enter()
    //  .append("circle")
    //    .attr("cx", xCircle+700)
    //    .attr("cy", function(d){ return height - 100 - z(d) } )
    //    .attr("r", function(d){ return z(d) })
    //    .style("fill", "none")
    //    .attr("stroke", "black")

    // Add legend: segments
    //svg
    //  .selectAll("legend")
    //  .data(valuesToShow)
    //  .enter()
    //  .append("line")
    //    .attr('x1', function(d){ return xCircle + z(d) } )
    //    .attr('x2', xLabel+700)
    //    .attr('y1', function(d){ return height - 100 - z(d) } )
    //    .attr('y2', function(d){ return height - 100 - z(d) } )
    //    .attr('stroke', 'black')
    //    .style('stroke-dasharray', ('2,2'))


    // Legend title
    //svg.append("text")
    //  .attr('x', xCircle)
    //  .attr("y", height - 100 +30)
    //  .text("Population (M)")
    //  .attr("text-anchor", "middle")
//
    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Atlanta United", "Chicago Fire", "Colorado Rapids", "Columbus Crew", "DC United",
    "FC Cincinnati", "FC Dallas", "Houston Dynamo", "LA Galaxy","LAFC",
    "Minnesota United", "Montreal Impact", "New England Revolution", "New York City FC",
    "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers",
    "Real Salt Lake", "San Jose Earthquakes", "Seattle Sounders FC", "Sporting Kansas City",
    "Toronto FC", "Vancouver Whitecaps" ]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 1000)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 1000 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  }
