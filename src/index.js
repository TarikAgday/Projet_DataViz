'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as heatmap from './scripts/heatmap.js'
import * as legend from './scripts/legend.js'
import * as tooltip from './scripts/tooltip.js'

import d3Tip from 'd3-tip'


$(function () {

  Promise.all([
    d3.csv("StatsJoueursConv.csv"),
    d3.csv("ClassementParEquipeConv.csv"),
  ]).then(function (files) {

    // files[0] data StatsJoueursConv
    // files[1] data ClassementParEquipeConv

    // creer tes fonctions dans un autre fichier et les appeler ici
    // var svg = d3.select("#viz_area")
    // var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    // svg.append("g").attr("class","yellow").append("circle").attr("cx", x(20)).attr("cy", 120).attr("r", 40).style("fill", "yellow").on('mousemove', function () {
    //   console.log("ines")
    // })

    // var svg = d3.select("#viz_area_2")
    // var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    // svg.append("circle").attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "blue");

    var data = preproc.stackedBarChartData(files[0])
    viz.drawStackedBarChart(data)

    var dataHeatMap = preproc.heatmapProcess(files[0])
    heatmap.appendHeatMap(dataHeatMap)
    // heatmap.appendHeatMap(dataHeatMap)

    //var svg = d3.select("#viz_area_3")
    //var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    //svg.append("g").attr("class","green").append("circle").attr("cx", x(70)).attr("cy", 150).attr("r", 40).style("fill", "green")
    //.on('mouseover', function () {
    //  console.log("green")
    //})
    //.on('mouseout', function () {
    //  console.log("green")
    //})

    var svg = d3.select("#viz_area_4")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("rect").attr("x", x(100)).attr("y", 100).attr("width", 40).attr("height", 40).style("fill", "blue")



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
      if (elements[i].style.opacity >= 0.9){
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