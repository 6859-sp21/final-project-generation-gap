
var main = d3.select("main");
var politicsScrolly = main.select("#politics-scrolly");
var politicsFigure = politicsScrolly.select("#politics-figure");
var politicsGenZFigure = politicsFigure.select("#politics-gen-z-figure");
var politicsBoomerFigure = politicsFigure.select("#politics-boomer-figure");
var politicsArticle = politicsScrolly.select("#politics-article");
var politicsStep = politicsArticle.selectAll(".step");


var scroller = scrollama();


function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.4);
    politicsStep.style("height", stepH + "px");
  
    var politicsFigureHeight = window.innerHeight / 2;
    var politicsFigureMarginTop = (window.innerHeight - politicsFigureHeight) / 2;

    politicsGenZFigure
        .style("height", politicsFigureHeight + "px")
        .style("width", 50 + "%");
    politicsBoomerFigure
        .style("height", politicsFigureHeight + "px")
        .style("width", 50 + "%");
  
    politicsFigure
      .style("height", politicsFigureHeight + "px")
      .style("top", politicsFigureMarginTop + "px");
  
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
  }

  function handlePoliticsStepEnter(response) {
    politicsFigure.select("p").text(response.index + 1);
    politicsStep.classed("is-active", function(d, i) {
        return i === response.index;
      });

    console.log(response.index);
    if (response.index == 0) {
        
    } else if (response.index == 1) {
    } else if (response.index == 2) {
    }
  }
  
  function init() {
    handleResize();
  
    scroller
      .setup({
        step: "#politics-scrolly #politics-article .step",
        offset: 0.5,
      })
      .onStepEnter(handlePoliticsStepEnter);
  
  
    window.addEventListener("resize", handleResize);
  }
  init();