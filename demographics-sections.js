var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select(
  "#demographics-gen-z-figure"
);
var demographicsBoomerFigure = demographicsFigure.select(
  "#demographics-boomer-figure"
);
var genZColor = "#FFA67D"
var boomerColor = "#00A08F"
var textColor = "#282828"
var demographicsGenZSVG = demographicsGenZFigure
  .insert("svg", ":nth-child(2)")
  .attr("width", "100%")
  .attr("height", window.innerHeight * 1.5);
  var demographicsBoomerSVG = demographicsBoomerFigure
  .insert("svg", ":nth-child(2)")
  .attr("x", "50%")
  .attr("width", "100%")
  .attr("height", window.innerHeight * 1.5) ;
var demographicsArticle = demographicsScrolly.select("#demographics-article");
var demographicsStep = demographicsArticle.selectAll(".step");
var width = 500;
var scroller = scrollama();

var genzTitle = demographicsGenZFigure.selectAll("#gen-z-title");
var boomerTitle = demographicsBoomerFigure.selectAll("#boomer-title");

function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.4);
  demographicsStep.style("height", stepH + "px");

  var demographicsFigureHeight = window.innerHeight * 0.8;
  var demographicsFigureMarginTop =
    (window.innerHeight - demographicsFigureHeight) / 2;
  width = window.innerWidth * .4;

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
  timelineReset()
  if (response.index == 0) {
    demographicsGenZFigure
      .selectAll("#gen-z-1").transition()
      .attr("opacity",1)
      .select("#timeline-description")
      .style("background-color", genZColor);
    
    demographicsBoomerFigure
      .selectAll("#boomer-1").transition()
      .attr("opacity",1)
      .select("#timeline-description")
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-1").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-1").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
  } else if (response.index == 1) {
    demographicsGenZFigure
      .selectAll("#gen-z-2").transition()
      .attr("opacity",1)
      .select("#timeline-description")
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-4").transition()
      .attr("opacity",1)
      .select("#timeline-description")
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-2").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-4").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
  } else if (response.index == 2) {
    demographicsGenZFigure
    .selectAll("#gen-z-3").transition()
    .attr("opacity",1)
    .select("#timeline-description")
    .style("background-color", genZColor);
  demographicsBoomerFigure
    .select(".timeline")
    .selectAll("#boomer-2").transition()
    .attr("opacity",1)
    .select("#timeline-description")
    .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-3").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-2").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
  } else if (response.index == 3) {
    demographicsGenZFigure
    .selectAll("#gen-z-4")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", genZColor);
  demographicsBoomerFigure
    .select(".timeline")
    .selectAll("#boomer-6")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-4").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-6").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
    
    // Iraq War
  } else if (response.index == 4) {
    demographicsGenZFigure
    .selectAll("#gen-z-5")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", genZColor);
  demographicsBoomerFigure
    .select(".timeline")
    .selectAll("#boomer-3")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-5").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-3").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
  } else if (response.index == 5) {
    demographicsGenZFigure
    .selectAll("#gen-z-6")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", genZColor);
  demographicsBoomerFigure
    .select(".timeline")
    .selectAll("#boomer-5")
    .select("#timeline-description").transition()
    .attr("opacity",1)
    .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-6").transition()
      .attr("opacity",1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-5").transition()
      .attr("opacity",1)
      .style("background-color", boomerColor);
  } 
}
function timelineReset() {
  demographicsGenZFigure
      .selectAll("#timeline-description")
      .style("background-color", "#f7f2ea")
      .transition()
     .attr("opacity",1);
    demographicsBoomerFigure
      .selectAll("#timeline-description")
      .style("background-color", "#f7f2ea")
      .transition()
     .attr("opacity",1);
  demographicsGenZFigure
      .selectAll(".circle")
      .style("background-color", "#f7f2ea")
      .transition()
     .attr("opacity",1);
  demographicsBoomerFigure
      .selectAll(".circle")
      .style("background-color", "#f7f2ea")
      .transition()
     .attr("opacity",1);
}

function init() {
  handleResize();

  scroller
    .setup({
      step: "#demographics-scrolly #demographics-article .step",
      offset: 0.7,
    })
    .onStepEnter(handleDemographicsStepEnter);

  window.addEventListener("resize", handleResize);
}

init();
