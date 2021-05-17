var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select(
  "#demographics-gen-z-figure"
);
var demographicsBoomerFigure = demographicsFigure.select(
  "#demographics-boomer-figure"
);
var demographicsArticle = demographicsScrolly.select("#demographics-article");
var demographicsStep = demographicsArticle.selectAll(".step");

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
  if (response.index == 0) {
    timelineHide();
  } else if (response.index == 1) {
    timelineHide();
  } else if (response.index == 2) {
    timelineHide();
  } else if (response.index == 3) {
    demographicsGenZFigure.selectAll("div").style("opacity", 1.0);
    demographicsBoomerFigure.selectAll("div").style("opacity", 1.0);
    demographicsGenZFigure.selectAll("div").style("color", "#282828");
    demographicsBoomerFigure.selectAll("div").style("color", "#282828");
    // Iraq War
  } else if (response.index == 4) {
    // TIMELINE SIMILARITY 1

    demographicsGenZFigure.selectAll("div").style("opacity", 1.0);
    demographicsBoomerFigure.selectAll("div").style("opacity", 1.0);
    demographicsGenZFigure.selectAll("div").style("color", "#282828");
    demographicsBoomerFigure.selectAll("div").style("color", "#282828");

    demographicsGenZFigure
      .select(".timeline")
      .selectAll("#gen-z-2")
      .select("#timeline-description")
      .style("background-color", "#AA78A6");
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-3")
      .select("#timeline-description")
      .style("background-color", "#008577");
  } else if (response.index == 5) {
    demographicsGenZFigure.selectAll("div").style("opacity", 1.0);
    demographicsBoomerFigure.selectAll("div").style("opacity", 1.0);
    demographicsGenZFigure.selectAll("div").style("color", "#282828").style("background-color", "transparent");
    demographicsBoomerFigure.selectAll("div").style("color", "#282828").style("background-color", "transparent");
    // Sandy Hook Shooting
  } else if (response.index == 6) {
    // Black Lives Matter Protests during Ferguson Unrest
    demographicsGenZFigure.selectAll("div").style("opacity", 1.0);
    demographicsBoomerFigure.selectAll("div").style("opacity", 1.0);
    demographicsGenZFigure.selectAll("div").style("color", "#282828");
    demographicsBoomerFigure.selectAll("div").style("color", "#282828");
  } else if (response.index == 7) {
    // SpaceX Launches
  }
}
function timelineHide() {
  demographicsGenZFigure.select(".timeline").style("opacity", 0.0);
  demographicsBoomerFigure.select(".timeline").style("opacity", 0.0);
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
