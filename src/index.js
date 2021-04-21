'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as heatmap from './scripts/heatmap'
import * as connectedDotPlot from './scripts/connectedDotPlot'
import * as bubbleChart from './scripts/bubbleChart'
import * as tooltip from './scripts/tooltip.js'
import * as scatterPlot from './scripts/scatterplot.js'
import * as multiPannelPlot from './scripts/multiPannelBar.js'

// import d3Tip from 'd3-tip'


$(function () {

  Promise.all([
    d3.csv("StatsJoueursConv.csv"),
    d3.csv("ClassementParEquipeConv.csv"),
  ]).then(function (files) {
    console.log("FILES 0 ", files[0])
    console.log("FILES 1 ", files[1])
    // files[0] data StatsJoueursConv
    // files[1] data ClassementParEquipeConv

    // creer tes fonctions dans un autre fichier et les appeler ici
    var svg = d3.select("#viz_area")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("g").attr("class","yellow").append("circle").attr("cx", x(20)).attr("cy", 120).attr("r", 40).style("fill", "yellow").on('mousemove', function () {
      console.log("ines")
  })

    // Area 2: Connected Dot Plot
    var dataConnectedDotPlot = preproc.connectedDotPlotProcess(files[1])
    connectedDotPlot.appendConnectedDotPlot(dataConnectedDotPlot)

    var data = preproc.stackedBarChartData(files[0])
    viz.drawStackedBarChart(data)

    var dataHeatMap = preproc.heatmapProcess(files[0])
    heatmap.appendHeatMap(dataHeatMap)

    const scatteredPlotData = preproc.scatteredPlotProcess(files[1])
    scatterPlot.drawScatteredPlotChart(scatteredPlotData)

    var bubbleChartData = preproc.bubbleChartPreProcess(files[0])
    bubbleChart.appendBubbleChart(bubbleChartData)


    var data = preproc.multipannelProcess(files[0])
    console.log("data")
    console.log(data)

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

    //console.log(elements[1].style)

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].style.opacity >= 0.6){
        for (let j = 0; j< elements[i].children[0].children.length; j++){
          elements[i].children[0].children[j].style["pointer-events"] = "auto"
          // console.log(elements[i].children[0].children[j])
        }
        // console.log(elements[i].children[0].children)
      //  elements[i].style.visibility = "visible"
    }
      else {
        for (let j = 0; j< elements[i].children[0].children.length; j++){
          elements[i].children[0].children[j].style["pointer-events"] = "none"
          // console.log(elements[i].children[0].children[j])
        }
    }
  }
  // console.log(d3.selectAll(".box").selectAll("svg")["_groups"])
  });

});