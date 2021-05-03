
var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select("#demographics-gen-z-figure");
var demographicsBoomerFigure = demographicsFigure.select("#demographics-boomer-figure");
var demographicsArticle = demographicsScrolly.select("#demographics-article");
var demographicsStep = demographicsArticle.selectAll(".step");


var scroller = scrollama();


function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.4);
    demographicsStep.style("height", stepH + "px");
  
    var demographicsFigureHeight = window.innerHeight / 2;
    var demographicsFigureMarginTop = (window.innerHeight - demographicsFigureHeight) / 2;

    demographicsGenZFigure
        .style("height", demographicsFigureHeight + "px")
        .style("width", 50 + "%");
    demographicsBoomerFigure
        .style("height", demographicsFigureHeight + "px")
        .style("width", 50 + "%");
  
    demographicsFigure
      .style("height", demographicsFigureHeight + "px")
      .style("top", demographicsFigureMarginTop + "px");
  
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
  }

  function handleDemographicsStepEnter(response) {
    demographicsFigure.select("p").text(response.index + 1);
    demographicsStep.classed("is-active", function(d, i) {
        return i === response.index;
      });

    console.log(response.index);
    if (response.index == 0) {
      var svg = d3.select("body")
                .append("svg")
                .attr("width", 200)
                .attr("height", 100)
                .style("border", "1px solid black");
      var imgs = svg.selectAll("img").data([0]);
      imgs.enter()
          .append("svg:img")
          .attr("xlink:href", "genx_population.png")
          .attr("x", "60")
          .attr("y", "60")
          .attr("width", "20")
          .attr("height", "20");
    } else if (response.index == 1) {
      var imgs = svg.selectAll("img").data([0]);
      imgs.enter()
          .append("svg:img")
          .attr("xlink:href", "genx_population.png")
          .attr("x", "60")
          .attr("y", "60")
          .attr("width", "20")
          .attr("height", "20");
    } else if (response.index == 2) {
    }
  }
  
  function init() {
    handleResize();
  
    scroller
      .setup({
        step: "#demographics-scrolly #demographics-article .step",
        offset: 0.5,
      })
      .onStepEnter(handleDemographicsStepEnter);
  
  
    window.addEventListener("resize", handleResize);
  }
  init();