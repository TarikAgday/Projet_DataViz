'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'
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
    var svg = d3.select("#viz_area")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("circle").attr("cx", x(10)).attr("cy", 100).attr("r", 40).style("fill", "blue");
    
    var svg = d3.select("#viz_area_2")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("circle").attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "blue");

    var svg = d3.select("#viz_area_3")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("circle").attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "green");

    var svg = d3.select("#viz_area_4")
    var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    svg.append("rect").attr("x", x(100)).attr("y", 100).attr("width", 40).attr("height", 40).style("fill", "blue");

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
  });

});