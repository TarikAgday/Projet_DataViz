// Code source: https://bl.ocks.org/tlfrd/e1ddc3d0289215224a69405f5e538f51
export function appendHeatMap (data){

    var hoverLine = false;
    var landscape = true;

    d3.select(".hover-line")
    	.on("click", function() {
      	hoverLine = d3.select(this).property("checked");
    	});

    d3.select(".sort-by")
    	.on("change", function() {
      	var attribute = d3.select(this).property("value");
      	sortLollipops(attribute, 1);
    	});

		var margin = {top: 120, right: 100, bottom: 50, left: 150};

    var width = 960 - margin.left - margin.right,
    		height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#viz_area_4").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function sortBy(data, attribute, order) {
    	data.sort(function(a, b) {
      	if(a[attribute] < b[attribute]) return -1 * order;
        if(a[attribute] > b[attribute]) return 1 * order;
        return 0;
    	});
    }

    // need to rewrite so start, min, lowest are the same
    var classToPos = {
      "lollipop-start": "min",
      "lollipop-median": "median",
      "lollipop-end": "max"
    }

    var legendLabels = [
      {label: "Goals Against", class: "lollipop-start"},
     //{label: "Median", class: "lollipop-median"},
      {label: "Goals Scored", class: "lollipop-end"}
    ];

    var legendX = 300,
    		legendY = -20,
    		spaceBetween = 70,
        titleOffset = -120;

   	// code for positioning legend
    var legend = svg.append("g")
    	.attr("transform", "translate(" + [legendX, legendY] + ")");

   	legend.append("g")
    	.attr("class", "title")
      .append("text")
    	.attr("x", titleOffset)
      .text("Yearly Salary (£)")

    // add circles for legend
    legend.selectAll("circle")
    	.data(legendLabels)
    .enter().append("circle")
    	.attr("cx", function(d, i) {
      	return spaceBetween * i;
    	})
    	.attr("cy", -4)
    	.attr("r", 5)
    	.attr("class", function(d) { return d.class });

    // add labels
    legend.append("g")
      .selectAll("text")
    	.data(legendLabels)
    .enter().append("text")
      .attr("x", function(d, i) {
      	return spaceBetween * i + 10;
    	})
    	.text(function(d) { return d.label });

    // Append div
    var div = d3.select("viz_area_4").append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);

    var posToColour = {
      min: "#ff0000",
     // median: "white",
      max: "#0000ff"
    };

    var y = d3.scaleBand()
    	.range([0, height])
    	.paddingInner(0.5)
    	.paddingOuter(0.7);

    var x = d3.scaleLinear()
    	.range([0, width]);

    var lineGenerator = d3.line();

    var axisLinePath = function(d) {
      return lineGenerator([[x(d) + 0.5, 0], [x(d) + 0.5, height]]);
    };

   	var lollipopLinePath = function(d) {
      return lineGenerator([[x(d.min), 0], [x(d.max), 0]]);
    };

    var selectionLine,
        lollipops,
        yAxis,
        yAxisGroup,
        xAxis,
        xAxisGroup,
        axisLines,
        lollipopsGroup;

    var startCircles,
        medianCircles,
        endCircles;

    // Make global for now
    var payRatios;

    var url = "https://raw.githubusercontent.com/tlfrd/pay-ratios/master/data/payratio.json";

    d3.json(url, function(error, data) {
      if (error) throw error;

      payRatios = data.pay_ratios_2015_16;

      // use -1 to flip ordering
    	sortBy(payRatios, "name", 1);

      y.domain(payRatios.map(function(d) { return d.name }));
      x.domain([0, d3.max(payRatios, function(d) { return d.max })]);
      x.nice();

      yAxis = d3.axisLeft().scale(y)
    		.tickSize(0);

      xAxis = d3.axisTop().scale(x)
        .tickFormat(function(d,i) {
          if (i == 0) {
            return "£0"
          } else {
            return d3.format(".2s")(d);
          }
        });

      yAxisGroup = svg.append("g")
      	.attr("class", "y-axis-group");

      yAxisGroup.append("g")
        .attr("class", "y-axis")
      	.attr("transform", "translate(-20, 0)")
        .call(yAxis)
				.select(".domain")
        .attr("opacity", 0);

      xAxisGroup = svg.append("g")
        .attr("class", "x-axis-group");

      xAxisGroup.append("g")
      	.attr("class", "x-axis")
        .call(xAxis);

      axisLines = svg.append("g")
      	.attr("class", "grid-lines");

    	axisLines.selectAll("path")
        .data(x.ticks())
      .enter().append("path")
        .attr("class", "grid-line")
        .attr("d", axisLinePath);

      selectionLine = xAxisGroup.append("g")
      	.attr("class", "interactive")
        .append("path")
        .attr("class", "selection-line")
        .attr("d", function() {
          return lineGenerator([[width / 2, 0],[width / 2, height]])
        })
        .attr("opacity", 0);

      lollipopsGroup = svg.append("g").attr("class", "lollipops");

     	lollipops = lollipopsGroup.selectAll("g")
        .data(payRatios)
      .enter().append("g")
        .attr("class", "lollipop")
        .attr("transform", function(d) {
          return "translate(0," + (y(d.name) + (y.bandwidth() / 2)) + ")";
        })

      lollipops.append("path")
        .attr("class", "lollipop-line")
        .attr("d", lollipopLinePath);

      startCircles = lollipops.append("circle")
    	.attr("class", "lollipop-start")
    	.attr("r", 5)
      .attr("cx", function(d) {
      	return x(d.min);
    	})
    	.on("mouseover", showLabel)
    	.on("mousemove", moveLabel)
      .on("mouseout", hideLabel);

      medianCircles = lollipops.append("circle")
        .attr("class", "lollipop-median")
        .attr("r", function(d) {
          if (d.median === "N/A") {
            return 0;
          } else {
            return 5;
          }
        })
        .attr("cx", function(d) {
          if (d.median === "N/A") {
            return 0;
          } else {
            return x(d.median);
          }
        })
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel);

      endCircles = lollipops.append("circle")
        .attr("class", "lollipop-end")
        .attr("r", 5)
        .attr("cx", function(d) {
          return x(d.max);
        })
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel);

		});

    function showLabel() {
       	var selection = d3.select(this);
        var pos = classToPos[selection.attr("class")];
        var data = d3.select(this.parentNode).datum();

        div.transition()
        	.duration(100)
        	.style("opacity", 0.9)
        div.html("£" + (selection.datum()[pos]))
          .style("left", (d3.event.pageX - 30) + "px")
          .style("top", (d3.event.pageY - 40) + "px")
        	.style("background-color", posToColour[pos])

      	if (hoverLine) {
          selectionLine
          	.attr("d", function() {
            	if (landscape) {
                return lineGenerator([[x(data[pos]), 0], [x(data[pos]), height]]);
              } else {
                return lineGenerator([[0, x(data[pos])], [width, x(data[pos])]]);
              }

          	})
          	.attr("opacity", 0.75);
        }
    }

    function moveLabel() {
      div.style("left", (d3.event.pageX - 30) + "px")
        .style("top", (d3.event.pageY - 40) + "px")
    }

    function hideLabel() {
      div.transition()
        .duration(200)
        .style("opacity", 0);

     	selectionLine
      	.attr("opacity", 0);
    }

    function sortLollipops(attribute, ordering) {
      sortBy(payRatios, attribute, 1);

			y.domain(payRatios.map(function(d) { return d.name })).copy();

      if (landscape) {
        lollipops
          .transition()
          .attr("transform", function(d) {
            return "translate(" + [0, (y(d.name) + y.bandwidth() / 2)] + ")";
          });

        yAxisGroup.select(".y-axis")
          .transition()
          .call(yAxis);
      } else {
         lollipops
          .transition()
          .attr("transform", function(d) {
            return "translate(" + [(y(d.name) + y.bandwidth() / 2), 0] + ")";
          });

         xAxisGroup.select(".x-axis")
          .transition()
          .call(yAxis);
      }


    }

    d3.select("svg").on("click", switchBetweenPortraitAndLandscape);

    function recalculateMargin(newMargin) {
      width = 960 - newMargin.left - newMargin.right;
      height = 500 - newMargin.top - newMargin.bottom;

     	d3.select("svg").select("g")
      	.attr("transform", "translate(" + newMargin.left + "," + newMargin.top + ")")
    }

    function switchBetweenPortraitAndLandscape() {

      if (landscape) {
        landscape = false;

        recalculateMargin({top: 100, right: 100, bottom: 100, left: 100})

        // Redraw xAxis
        x.range([height, 0]);

      	xAxis = d3.axisLeft().scale(x)
          .tickFormat(function(d, i) {
            if (i == 0) {
              return "£0"
            } else {
              return d3.format(".2s")(d);
            }
          });

      	yAxisGroup.select(".y-axis")
          .call(xAxis)
        	.attr("transform", "translate(0, 0)")
          .select(".domain")
          	.attr("opacity", 1);

        // Redraw yAxis
       	y.range([0, width]);

        yAxis = d3.axisBottom().scale(y)
    			.tickSize(0);

        xAxisGroup.select(".x-axis")
          .call(yAxis)
        	.attr("transform", "translate(0," + height + ")")
          .select(".domain")
          	.attr("opacity", 0);

        xAxisGroup.select(".x-axis").selectAll("text")
          .attr("y", 9)
          .attr("x", 9)
          .attr("transform", "rotate(45)")
          .style("text-anchor", "start");

        // Redraw lollipops

				lollipops.attr("transform", function(d) {
          return "translate(" + [(y(d.name) + (y.bandwidth() / 2)), 0] + ")";
        });

        lollipops.select(".lollipop-line")
        	.attr("d", function(d) {
          	return lineGenerator([[0, x(d.min)], [0, x(d.max)]]);
        	})
        lollipops.select(".lollipop-start")
        	.attr("cy", function(d) {
          	return x(d.min);
        	})
        	.attr("cx", 0);
        lollipops.select(".lollipop-median")
          .attr("cy", function(d) {
            if (d.median === "N/A") {
              return 0;
            } else {
              return x(d.median);
            }
        	})
        	.attr("cx", 0);
        lollipops.select(".lollipop-end")
          .attr("cy", function(d) {
          	return x(d.max);
        	})
        	.attr("cx", 0);

        // Redraw grid lines

        axisLines.selectAll(".grid-line")
        	.attr("d", function(d) {
          	return lineGenerator([[0, x(d) + 0.5], [width, x(d) + 0.5]]);
        	});

        // Move legend

        legend.attr("transform", "translate(" + [legendX + 40, legendY] + ")");

      } else {

        landscape = true;

        recalculateMargin(margin);

       	// Redraw xAxis
        x.range([0, width]);

      	xAxis = d3.axisTop().scale(x)
          .tickFormat(function(d, i) {
            if (i == 0) {
              return "£0"
            } else {
              return d3.format(".2s")(d);
            }
          });

      	xAxisGroup.select(".x-axis")
          .call(xAxis)
        	.attr("transform", "translate(0,0)")
        	.select(".domain")
          	.attr("opacity", 1);

        // Redraw yAxis
       	y.range([0, height]);

        yAxis = d3.axisLeft().scale(y)
    			.tickSize(0);

        yAxisGroup.select(".y-axis")
          .call(yAxis)
        	.attr("transform", "translate(-20, 0)")
          .select(".domain")
          	.attr("opacity", 0);

        // Redraw lollipops

        lollipops.attr("transform", function(d) {
          return "translate(0," + (y(d.name) + (y.bandwidth() / 2)) + ")";
        });

        lollipops.select(".lollipop-line")
        	.attr("d", function(d) {
          	return lineGenerator([[x(d.min), 0], [x(d.max), 0]]);
        	})
        lollipops.select(".lollipop-start")
        	.attr("cx", function(d) {
          	return x(d.min);
        	})
        	.attr("cy", 0);
        lollipops.select(".lollipop-median")
          .attr("cx", function(d) {
            if (d.median === "N/A") {
              return 0;
            } else {
              return x(d.median);
            }
        	})
        	.attr("cy", 0);
        lollipops.select(".lollipop-end")
          .attr("cx", function(d) {
          	return x(d.max);
        	})
        	.attr("cy", 0);

        // Redraw grid lines

        axisLines.selectAll(".grid-line")
        	.attr("d", axisLinePath);

        // Reposition legend

        legend.attr("transform", "translate(" + [legendX, legendY] + ")");

      }

    }
}