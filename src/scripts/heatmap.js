/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  let min = 0
  let max = 0
  for (let index = 0; index < data.length; index++) {
      const element = data[index].Salary;
      if (element > max)
          max = element
  }
    colorScale.domain([min,max])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendHeatMap (data) {
var max = 0
for (let index = 0; index < data.length; index++) {

    var element = data[index].ageGroupSalary
    if(element>max){max=element}

}
// set the dimensions and margins of the graph
  var margin = {top: 100, right: 150, bottom: 30, left: 250},
  width = 1500 - margin.left - margin.right,
      height = 1300 - margin.top - margin.bottom;

  var svg = d3.select("#viz_area_2")
   .append("svg")
    .attr("width", width + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left+ "," + margin.top + ")");

// Labels of row and columns
  var clubs = d3.map(data, function(d){return d.Club;}).keys()
  var ageGroups = d3.map(data, function(d){return d.Age;}).keys()
  var agetitles = ["15-16","17-18","19-20","21-22","23-24","25-26","27-28","29-30","31-32","33-34","35-36","37-38","39-40"]

// Build X scales and axis:
  var xScale = d3.scaleBand()
    .range([ 0, width-100 ])
    .domain(ageGroups)
    .padding(0.01);
  svg.append("g")
    .attr("transform", "translate(0,"+ height  + ")")
    .call(d3.axisBottom().scale(xScale)
    .tickFormat(function(d,i){ return agetitles[i] }))
    .style("font-size", "22px")
  .selectAll("text")
    .attr("transform", "translate(0 0) rotate(0)")


// Build Y scales and axis:
var yScale = d3.scaleBand()
  .range([ height, 0 ])
  .domain(clubs)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft().scale(yScale))
  .style("font", "22px Lora")

  //Axis titles


svg.append("text")
 .attr("transform", "translate(-120,-10)")
 .text("Teams")
 .style("font", "32px Lora")
 .style("fontWeight","bolder")

// Build color scale
  var myColor = d3.scaleLinear()
  .range(["white", "#9b0026"])
  .domain([0,1500000])


//Viz title
   svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top/5))
    .attr("text-anchor", "middle")
    .style("font", "36px Lora")
    .style("text-decoration", "underline")
    .text("SALARIES BY AGE GROUPS")
    .style("font", "32px Lora")


  // add the rectangles

  d3.select("#viz_area_2")
  .selectAll(".salary-g")
  .data(data)
  .join("g")
  .attr("class", "salary-g")
  .append("rect")
  .attr("class", "salary-rect")
  .attr("x", function (d) {
      return xScale(d.Age);
    })
  .attr("y", function (d) {
      return yScale(d.Club) + (0.75*(margin.top));
    })
  .attr("width", function (d) {
      return xScale.bandwidth();
    })
  .attr("height", function (d) {
      return yScale.bandwidth();
    })
  .attr("fill", function (d) {
      return myColor(d.ageGroupSalary);})

  .attr("transform", "translate( "+ margin.left +" 25)")
  .style("stroke", "black")
  .style("stroke-width","0.2")
  .style("stroke-opacity","0.3")
  .on("mouseover",  function(d) { return tip.show(d,this) })
  .on("mouseout",  function(d) { tip.hide(this) })


// Function to generate tooltip
const tip = d3.tip().attr('class', 'd3-tip').html(function (d) { return getContents(d) })
svg.call(tip)

// Get content of Rectangle tooltip
function getContents (d) {
  return '</span><bold> Club : </bold><span style="font-weight: normal">' + d.Club
  +
      '<span> <br>Age group :  <span style="font-weight: normal">' + (15 + (d.Age*2)) + '-' + (15 + (d.Age*2)+1)
  +
  '</span><br><bold> Total salary : </bold><span style="font-weight: normal">' + formatNumber(d.ageGroupSalary) + " $"

}

//Format integers to add comas for millions or thousands values
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
drawHeatmapLegend (myColor,myColor)
}


export function drawHeatmapLegend (fill,colorScale) {


    var x = 150 , y =1300 , width = 900, height = 15

    var leg = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([height, 0])

    var colorsLegend =  ["white","#f3e0e5","#e1b4bf","#b22859","#7a0000","black"]
    var valueLegend = ["0" , "100k", "500k", "1M" , "2M" , "3.5M", "7.5M"]

    const svg = d3.select("#viz_area_2")
    svg.append('g')
      .selectAll("legendRect")
      .data(colorsLegend)
      .enter()
      .append('rect')
      .attr('class', 'legend bar')
        .attr("height", 150)
        .attr("width", 15)
        .attr("y", function(d,i){ return (150 + (i*150))})
        .attr("x", 1500)
        .attr("fill",function(d){ return d})
        .style("stroke", "black")


          svg.append("text")
          .attr("transform", "translate(1300,1275)")
          .text("Age groups")
          .style("font", "32px Lora")

          for (let i = 0; i < valueLegend.length; i++) {
            svg.append("text")
                .attr("transform", "translate("+1520+","+(150 + (i*152))+")")
                .text(valueLegend[i])
                .style("font", "22px Lora")
                .style("fontWeight","bolder")

          }

}
