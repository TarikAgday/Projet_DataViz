// 'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as heatmap from './scripts/heatmap.js'
import * as connectedDotPlot from './scripts/connectedDotPlot.js'
import * as bubbleChart from './scripts/bubbleChart.js'
import * as scatterPlot from './scripts/scatterplot.js'
import * as multiPannelPlot from './scripts/multiPannelBar.js'


$(function () {

  Promise.all([
    d3.csv("StatsJoueursConv.csv"),
    d3.csv("ClassementParEquipeConv.csv"),
  ]).then(function (files) {
    var svg = d3.select("#viz_area")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);

    // Area 2: Connected Dot Plot
    var dataConnectedDotPlot = preproc.connectedDotPlotProcess(files[1])
    connectedDotPlot.appendConnectedDotPlot(dataConnectedDotPlot)

    var data = preproc.stackedBarChartData(files[0])
    viz.drawStackedBarChart(data)


    var dataHeatMap = preproc.heatmapProcess(files[0])
    heatmap.appendHeatMap(dataHeatMap)

    d3.select("#viz_area_1").style("margin-left", "500")
    const scatteredPlotData = preproc.scatteredPlotProcess(files[1])
    scatterPlot.drawScatteredPlotChart(scatteredPlotData)

   var dataMBUBLLE = preproc.multipannelBubbleChartProcess(files[0])
   bubbleChart.drawMultiPannelBubble(dataMBUBLLE)

    var data = preproc.multipannelProcess(files[0])
    multiPannelPlot.drawMultiPannelBar(data)

    var svg = d3.select("#viz_area_end")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("rect").attr("x", x(100)).attr("y", 100).attr("width", 40).attr("height", 40).style("fill", "yellow");

  })

  var dimensions = {}, elements = [];

  var onResize = function () {
    dimensions.windowHeight = $(window).height();
    dimensions.boxHeight = $('.box-placeholder').height();
    dimensions.boxOffsetTop = $('.box-placeholder').offset().top;
  };
  $(window).resize(onResize);

  $(document).on('ready', function () {
    $('.box').each(function (index, box) {
      if (index === 0) return true;
      elements.push(box);
    });
    onResize();
  });


  document.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY

    if (scrollPosition > 0) d3.select("#viz_area").style("opacity","0")
    if (scrollPosition == 0) d3.select("#viz_area").style("opacity","1")


    if (scrollPosition < 0) return true;
    var division = scrollPosition / (dimensions.boxHeight / (elements.length ));
    var currentIndex = Math.floor(division);
    var rest = division - currentIndex;

    for (var i = 0; i < currentIndex; i++) {
      elements[i].style.opacity = 0;
    }

    elements[currentIndex].style.opacity = rest;

    for (var i = currentIndex + 1; i < elements.length; i++) {
      elements[i].style.opacity = 0;
    }

    for (var i = currentIndex + 1; i < elements.length; i++) {
      elements[i].style.opacity = 0;
    }

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].style.opacity >= 0.6){
        for (let j = 0; j< elements[i].children[0].children.length; j++){
          elements[i].children[0].children[j].style["pointer-events"] = "auto"
        }
    }
      else {
        for (let j = 0; j< elements[i].children[0].children.length; j++){
          elements[i].children[0].children[j].style["pointer-events"] = "none"
        }
    }
  }
  });

});
