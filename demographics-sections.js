var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select(
  "#demographics-gen-z-figure"
);
var demographicsBoomerFigure = demographicsFigure.select(
  "#demographics-boomer-figure"
);
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
  if (response.index == 0) {
    timelineHide();
    // Show Image of Gen Z and Boomer
  } else if (response.index == 1) {
    timelineHide();
    genZPopulation = Array(86).join(".").split(".")
    genZ = demographicsGenZSVG.selectAll("rect").data(genZPopulation);
    genZ
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      const n = i % 10;
      return n * 13
    })
    .attr("y", (d, i) => {
      const n = Math.floor(i / 10);
      return n * 13
    })
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "black")
    boomerPopulation = Array(68).join(".").split(".")

    boomer = demographicsBoomerSVG.selectAll("rect").data(boomerPopulation);
    boomer
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      const n = i % 10;
      return n * 13
      
    })
    .attr("y", (d, i) => {
      const n = Math.floor(i / 10);
      return n * 13
    })
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "black")


  } else if (response.index == 2) {
    timelineHide();
    
    demographicsGenZSVG.selectAll("rect")
    .attr("fill", (d, i) =>{
      if (i < .52 * 86){
        return "red";
      } else if (i < .77 * 86){
        return "green";
      } else if (i < .91 * 86) {
        return "purple";
      } else if (i < .97 * 86) {
        return "blue";
      } else {
        return "orange";
      }
    })
    demographicsBoomerSVG.selectAll("rect")
    .attr("fill", (d, i) =>{
      if (i < .82 * 68){
        return "red";
      } else if (i < .86 * 68){
        return "green";
      } else if (i < .98 * 68) {
        return "purple";
      } else if (i < .99 * 68) {
        return "blue";
      } else {
        return "orange";
      }
    })
  } else if (response.index == 3) {
    demographicsGenZFigure.selectAll("svg").remove()
    demographicsBoomerFigure.selectAll("svg").remove()
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
    demographicsGenZFigure.selectAll("div").style("color", "#282828");
    demographicsGenZFigure
      .selectAll("p")
      .style("background-color", "transparent");
    demographicsBoomerFigure.selectAll("div").style("color", "#282828");
    demographicsBoomerFigure
      .selectAll("p")
      .style("background-color", "transparent");
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
  demographicsGenZFigure.select(".timeline").style("height", 0.0);
  demographicsBoomerFigure.select(".timeline").style("height", 0.0);
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
