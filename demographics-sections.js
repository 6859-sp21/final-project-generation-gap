var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select(
  "#demographics-gen-z-figure"
);
var demographicsBoomerFigure = demographicsFigure.select(
  "#demographics-boomer-figure"
);
var genZColor = "#FFA67D";
var boomerColor = "#00A08F";
var textColor = "#282828";


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
  width = window.innerWidth * 0.4;

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

var timeline_tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "timeline_tooltip")
  .style("opacity", 0);

var timeline_urls = {
  war: [
    "https://www.nytimes.com/2003/03/19/international/bush-orders-start-of-war-on-iraq-missiles-said-to-be-aimed-at.html",
    "https://www.nytimes.com/1964/08/05/archives/forces-enlarged-stevenson-to-appeal-for-action-by-un-on-open.html",
  ],
  technology: [
    "https://www.nytimes.com/2007/06/27/technology/circuits/27pogue.html",
    "https://www.nytimes.com/1971/05/23/archives/color-tv-sales-gaining-despite-price-rise-saturation-nears-50.html",
  ],
  shooting: [
    "https://www.nytimes.com/2012/12/15/nyregion/shooting-reported-at-connecticut-elementary-school.html",
    "https://www.nytimes.com/1970/05/05/archives/4-kent-state-students-killed-by-troops-8-hurt-as-shooting-follows.html",
  ],
  protest: [
    "https://www.nytimes.com/2014/11/25/us/ferguson-darren-wilson-shooting-michael-brown-grand-jury.html",
    "https://archive.nytimes.com/www.nytimes.com/learning/general/onthisday/big/0828.html",
  ],
  space: [
    "https://www.nytimes.com/2020/05/30/science/spacex-nasa-astronauts.html",
    "https://www.nytimes.com/1969/07/21/archives/astronauts-land-on-plain-collect-rocks-plant-flag-a-powdery-surface.html",
  ],
};

function handleMouseOverGenzTimeline() {
  var category = d3.select(this).attr("value");
  d3.select(this).on("click", () => {
    window.open(timeline_urls[category][0]);
  });
  timeline_tooltip.transition().duration(0).style("opacity", 1);
  timeline_tooltip
    .html(
      `<div class='tooltip-timeline-more'>Click to read article</div>
    <img src="img/genz/${category}.jpeg" style="width: 400px" />`
    )
    .style("left", d3.event.pageX + 20 + "px")
    .style("top", d3.event.pageY - 20 + "px");
}

function handleMouseOutGenzTimeline() {
  timeline_tooltip.transition().duration(0).style("opacity", 0);
}

function handleMouseOverBoomerTimeline() {
  var category = d3.select(this).attr("value");
  d3.select(this).on("click", () => {
    window.open(timeline_urls[category][1]);
  });
  timeline_tooltip.transition().duration(0).style("opacity", 1);
  timeline_tooltip
    .html(
      `<div class='tooltip-timeline-more'>Click to read article</div>
    <img src="img/boomer/${category}.jpeg" style="width: 400px" />`
    )
    .style("left", d3.event.pageX + 20 + "px")
    .style("top", d3.event.pageY - 20 + "px");
}

function handleMouseOutBoomerTimeline() {
  timeline_tooltip.transition().duration(0).style("opacity", 0);
}

function handleDemographicsStepEnter(response) {
  timelineReset();
  if (response.index == 0) {
    demographicsGenZFigure
      .selectAll("#gen-z-1")
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", genZColor);

    demographicsBoomerFigure
      .selectAll("#boomer-1")
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-1")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-1")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
  } else if (response.index == 1) {
    demographicsGenZFigure
      .selectAll("#gen-z-2")
      .on("mouseover", handleMouseOverGenzTimeline)
      .on("mouseout", handleMouseOutGenzTimeline)
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-4")
      .on("mouseover", handleMouseOverBoomerTimeline)
      .on("mouseout", handleMouseOutBoomerTimeline)
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-2")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-4")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
  } else if (response.index == 2) {
    demographicsGenZFigure
      .selectAll("#gen-z-3")
      .on("mouseover", handleMouseOverGenzTimeline)
      .on("mouseout", handleMouseOutGenzTimeline)
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-2")
      .on("mouseover", handleMouseOverBoomerTimeline)
      .on("mouseout", handleMouseOutBoomerTimeline)
      .transition()
      .attr("opacity", 1)
      .select("#timeline-description")
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-3")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-2")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
  } else if (response.index == 3) {
    demographicsGenZFigure
      .selectAll("#gen-z-4")
      .on("mouseover", handleMouseOverGenzTimeline)
      .on("mouseout", handleMouseOutGenzTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-6")
      .on("mouseover", handleMouseOverBoomerTimeline)
      .on("mouseout", handleMouseOutBoomerTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-4")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-6")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);

    // Iraq War
  } else if (response.index == 4) {
    demographicsGenZFigure
      .selectAll("#gen-z-5")
      .on("mouseover", handleMouseOverGenzTimeline)
      .on("mouseout", handleMouseOutGenzTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-3")
      .on("mouseover", handleMouseOverBoomerTimeline)
      .on("mouseout", handleMouseOutBoomerTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-5")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-3")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
  } else if (response.index == 5) {
    demographicsGenZFigure
      .selectAll("#gen-z-6")
      .on("mouseover", handleMouseOverGenzTimeline)
      .on("mouseout", handleMouseOutGenzTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .select(".timeline")
      .selectAll("#boomer-5")
      .on("mouseover", handleMouseOverBoomerTimeline)
      .on("mouseout", handleMouseOutBoomerTimeline)
      .select("#timeline-description")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
    demographicsGenZFigure
      .selectAll("#circle-6")
      .transition()
      .attr("opacity", 1)
      .style("background-color", genZColor);
    demographicsBoomerFigure
      .selectAll("#circle-5")
      .transition()
      .attr("opacity", 1)
      .style("background-color", boomerColor);
  }
}
function timelineReset() {
  demographicsGenZFigure
    .selectAll("#timeline-description")
    .style("background-color", "#f7f2ea")
    .transition()
    .attr("opacity", 1);

  demographicsGenZFigure
    .selectAll("#gen-z-1")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll("#gen-z-2")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll("#gen-z-3")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll("#gen-z-4")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll("#gen-z-5")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll("#gen-z-6")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#timeline-description")
    .style("background-color", "#f7f2ea")
    .on("mouseover", null)
    .on("mouseout", null)
    .transition()
    .attr("opacity", 1);

  demographicsBoomerFigure
    .selectAll("#boomer-1")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#boomer-2")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#boomer-3")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#boomer-4")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#boomer-5")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsBoomerFigure
    .selectAll("#boomer-6")
    .on("mouseover", null)
    .on("mouseout", null);

  demographicsGenZFigure
    .selectAll(".circle")
    .style("background-color", "#f7f2ea")
    .on("mouseover", null)
    .on("mouseout", null)
    .transition()
    .attr("opacity", 1);

  demographicsBoomerFigure
    .selectAll(".circle")
    .style("background-color", "#f7f2ea")
    .on("mouseover", null)
    .on("mouseout", null)
    .transition()
    .attr("opacity", 1);
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
