//import d3Tip from 'd3-tip'

// code source https://www.d3-graph-gallery.com/graph/bubble_template.html
// set the dimensions and margins of the graph

export function drawMultiPannelBubble(dataPosition){
  var x = 0, y = 100
  var count = 0
  dataPosition.forEach(function(d, i){
    appendBubbleChart(d, x, y)
      if (count < 1){
          x+=725
      }else {
          x = 0
          y+=650
          count = -1
      }
      count++
  }),appendBubbleChartLegend(),appendBubbleChartTitles();
}

export function appendBubbleChart (data, x , y) {

  console.log("Bubble Data", data)

    var margin = {top: 25, right: 25, bottom: 25, left: 50}
       var height = 600, width = 700
       // width = 1200 - margin.left - margin.right,
       // height = 1000 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#viz_area_5")
      .append("g")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("x", x)
        .attr("y", y)





      // ---------------------------//
      //       AXIS  AND SCALE      //
      // ---------------------------//

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 3400])
        .range([ 0, width ]);
      svg.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(3));

 //    var x = d3.scaleLinear().domain(data.Players.map(function(d) {
 //     return d.MinsPlayed
 // })).range([0, 3500])

  var y = d3.scaleLinear()
  .range([ height,0])
  .domain([0, d3.max(data.Players, function(d){

      return (parseInt(d.Performance)*1.10)
  })])
  console.log("MAX",d3.max(data.Players,
    function(d){return parseInt(d.Performance)}), )
  svg.append('g')
        .attr("transform", "translate("+width+",0 )")
        .call(d3.axisBottom(x).ticks(3));

  var xAxis = d3.axisBottom().scale(x)
  var yAxis = d3.axisLeft().scale(y)

  svg.append("g")
    .attr("transform", "translate("+margin.left+","+  (height-margin.bottom)+ ")")
    .call(xAxis)
   // .selectAll("text")
   // .attr("transform", "rotate(-90)")
   // .attr("dy", ".35em")
   // .attr("y", 0)
   // .attr("x", -50)


    svg.append("g")
    .attr("transform", "translate(50,"+(-margin.bottom)+")")
    .call(yAxis)
   // .selectAll("text")
   // .attr("x", 30)
   // .attr("transform", "translate(-40)")
      // Add X axis label:
   //   svg.append("text")
   //       .attr("text-anchor", "end")
   //       .attr("x", w)
   //       .attr("y", h+50 )
   //       .text("Minutes played");
//
   //   // Add Y axis
   //   var y = d3.scaleLinear()
   //     .domain([0, 70])
   //     .range([ h, 0]);
   //   svg.append('g')
   //     .call(d3.axisLeft(y));
//
   //   // Add Y axis label:
   //   svg.append("text")
   //       .attr("text-anchor", "end")
   //       .attr("x", -30)
   //       .attr("y", -20 )
   //       .text("Performance")
   //       .attr("text-anchor", "start")
//
      // Add a scale for bubble size
      var z = d3.scaleSqrt()
        .domain([200000, 1310000000])
        .range([ 2, 15]);

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
        .data(data.Players)
        .enter()
        .append("circle")
          .attr("class" , function(d){ return "dot" + d.Club })
          .attr("cx", function (d) { return x(d.Minutes)+margin.left } )
          .attr("cy", function (d) { return y(d.Performance)-margin.bottom } )
          .attr("r", function (d) { return z(d.Salary*500); } )
          .style("fill", "black")
         .on("mouseover",  function(d) { return tip.show(d,this) })
        .on("mouseout",  function(d) { tip.hide(this) })
        // -3- Trigger the functions for hover
        //.on("mouseover", showTooltip )
        //.on("mousemove", moveTooltip )
        //.on("mouseleave", hideTooltip )







            // Function to generate tooltip
            const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
              svg.call(tip)

            // Get content of Bubbles tooltip
            function getContents (d) {
              return '</span><bold> Player : </bold><span style="font-weight: normal">' + d.Name
              +
                  '<span> <br>Club :  <span style="font-weight: normal">' + d.Club
              +
              '</span><br><bold> Salary : </bold><span style="font-weight: normal">' + formatNumber(d.Salary) + " $"
              +
              '</span><br><bold> Performance : </bold><span style="font-weight: normal">' + d.Performance
              +
              '</span><br><bold> Position : </bold><span style="font-weight: normal">' + d.Position+
              '</span><br><bold> Minutes played : </bold><span style="font-weight: normal">' + d.Minutes

            }

            //Format integers to add comas for millions or thousands values
            function formatNumber(num) {
              return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
    }

    export function appendBubbleChartTitles() {
      var allTitles = ["Midfielders", "Defenders", "Forwards", "Goalkeepers"]
    //Viz title
    var svg = d3.select("#viz_area_5")
    svg.append('g')
    .selectAll("titles")
    .data(allTitles)
    .enter()
    .append("text")
    .attr('class', 'titles')
      .attr("x", function(d,i){
          console.log(("X",i))
          if(i%2 == 0)
          {return  300}
          else{return 1000}})
      .attr("y", function(d,i)
      { if(i<2){return 100}
        else{return 800}})
      .text(function(d,i){return d})
      .style("fill", "black");


       //Viz title
  // svg.append("text")
  // .attr("x", (width / 2))
  // .attr("y", 0 - (margin.top/5))
  // .attr("text-anchor", "middle")
  // .style("font-size", "28px")
  // .style("text-decoration", "underline")
  // .text("Salaries by age groups");
      }


    export function appendBubbleChartLegend() {
        // ---------------------------//
        //       LEGEND              //
        // ---------------------------//

        // Add one dot in the legend for each name.
        var size = 20
        var allgroups = ["Atlanta", "Chicago", "Colorado", "Columbus", "DC",
        "Cincinnati", "Dallas", "Houston", "LA","LAFC",
        "Minnesota", "Montreal", "New", //"New", missing NYRB NYC NE rev
         "Orlando", "Philadelphia", "Portland",
        "Real", "San", "Seattle", "Sporting",
        "Toronto", "Vancouver" ]

        var svg = d3.select("#viz_area_5")
        svg.append('g')
          .selectAll("mylegend")
          .data(allgroups)
          .enter()
          .append("circle")
          .attr('class', 'circlesLeg')
            .attr("cx", 1500)
            .attr("cy", function(d,i){ return  400+(i * (size + 5) + (size/2))}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", "black")




        // Add labels beside legend dots
        svg.append('g')
        .attr('class', 'legend text')
          .selectAll("mylabels")
          .append('g')
          .data(allgroups)
          .enter()
          .append("text")
            .attr("x", 1500 + size*.8)
            .attr("y", function(d,i){ return 400+(i * (size + 5) + (size/2))}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", "black")
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", function(d,i) {
              console.log(d)
                d3.selectAll(".dot"+d)//.filter(function(d) { return d. == "for_bath"; })
                .style("fill", "red")})
            .on("mouseleave", function(d,i) {
                d3.selectAll(".dot"+d)
                .style("fill", "black")})

           // const button = svg.append('g')
           // .attr('class', 'button')
           // .attr('transform', 'translate(' + 1500 + ', 610)')
           // .attr('width', 400)
           // .attr('height', 25)

          //button.append('rect')
          //  .attr('width', 130)
          //  .attr('height', 30)
          //  .attr('fill', '#f4f6f4')
          //  .on('mouseenter', function () {
          //    d3.select(this).attr('stroke', '#362023')
          //  })
          //  .on('mouseenter', function () {
          //    d3.select(this).attr('stroke', '#362023')
          //  })
          //  .on('mouseleave', function () {
          //    d3.select(this).attr('stroke', '#f4f6f4')
          //  })

          //button.append('text')
          //  .attr('x', 65)
          //  .attr('y', 15)
          //  .attr('text-anchor', 'middle')
          //  .attr('dominant-baseline', 'middle')
          //  .attr('class', 'button-text')
          //  .text('See dataset')
          //  .attr('font-size', '10px')
          //  .attr('fill', '#362023')
          }