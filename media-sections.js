var main = d3.select("main");
var mediaScrolly = main.select("#media-scrolly");
var mediaFigure = mediaScrolly.select("#media-figure");
var mediaGenZFigure = mediaFigure.select("#media-gen-z-figure");
var mediaBoomerFigure = mediaFigure.select("#media-boomer-figure");
var mediaArticle = mediaScrolly.select("#media-article");
var mediaStep = mediaArticle.selectAll(".step");


const genZFollowNews = [
  { category: "Very Closely", percent: 0.15 },
  { category: "Somewhat Closely", percent: 0.35 },
  { category: "Not Too Closely", percent: 0.38 },
  { category: "Not At All Closely", percent: 0.12 },
];
const boomersFollowNews = [
  { category: "Very Closely", percent: 0.5 },
  { category: "Somewhat Closely", percent: 0.39 },
  { category: "Not Too Closely", percent: 0.09 },
  { category: "Not At All Closely", percent: 0.03 },
];
const genZNewsSource = [
  {source: "ABC", percent: .03},
  {source: "CBS", percent: .01},
  {source: "CNN", percent: .12},
  {source: "Fox", percent: .08},
  {source: "MSNBC", percent: .01},
  {source: "NBC", percent: .03},
  {source: "NPR", percent: .04},
  {source: "Social Media", percent: .11},
  {source: "New York Times", percent: .04},
  {source: "Other Sources", percent: .32}
]
const boomerNewsSource = [
  {source: "ABC", percent: .05},
  {source: "CBS", percent: .05},
  {source: "CNN", percent: .1},
  {source: "Fox", percent: .28},
  {source: "MSNBC", percent: .08},
  {source: "NBC", percent: .05},
  {source: "NPR", percent: .03},
  {source: "Social Media", percent: .0},
  {source: "New York Times", percent: .02},
  {source: "Other Sources", percent: .27}
]


var width = 300;
var height= 500;
var margin = { top: 30, right: 0, bottom: 30, left: 40 };
var y = d3.scaleLinear()
    .domain([0, 1]).nice()
    .range([height - margin.bottom, margin.top])
var x = d3
  .scaleBand()
  .domain(d3.range(genZFollowNews.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);
var y2 = d3.scaleLinear()
  .domain([0, 1]).nice()
  .range([height - margin.bottom, margin.top])
var x2 = d3
.scaleBand()
.domain(d3.range(genZNewsSource.length))
.range([margin.left, width - margin.right])
.padding(0.1);


var scroller = scrollama();



function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.4);
  mediaStep.style("height", stepH + "px");

  var mediaFigureHeight = window.innerHeight / 2;
  var mediaFigureMarginTop = (window.innerHeight - mediaFigureHeight) / 2;

  mediaGenZFigure
    .style("height", mediaFigureHeight + "px")
    .style("width", 50 + "%");
  mediaBoomerFigure
    .style("height", mediaFigureHeight + "px")
    .style("width", 50 + "%");

  mediaFigure
    .style("height", mediaFigureHeight + "px")
    .style("top", mediaFigureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

function handleMediaStepEnter(response) {
  mediaFigure.select("p").text(response.index + 1);
  mediaStep.classed("is-active", function (d, i) {
    return i === response.index;
  });

  console.log(response.index);
  if (response.index == 0) {
  } else if (response.index == 1) {
    followNews();
  } else if (response.index == 2) {
    newsSource();
  }
}
function followNews() {
  mediaGenZSVG.selectAll("rect").remove()
  mediaBoomerSVG.selectAll("rect").remove()

  
  mediaGenZSVG
    .selectAll("rect")
    .data(genZFollowNews)
    .join("rect")
    .attr("x", (d, i) => {
      console.log(i);
      // console.log(x(i));
      return x(i);
    })
    .attr("y", (d) => y(d.percent))
    .attr("height", d => y(0) - y(d.percent))
    .attr("width", x.bandwidth());
  mediaBoomerSVG
    .selectAll("rect")
    .data(boomersFollowNews)
    .join("rect")
    .attr("x", (d, i) => x(i) + 50)
    .attr("y", (d) => y(d.percent))
    .attr("height", d => y(0) - y(d.percent))
    .attr("width", x.bandwidth());
  var followNewsXAxis = d3.svg.axis.scale(x)
  
}
function newsSource() {
  mediaGenZSVG.selectAll("rect").remove()
  mediaBoomerSVG.selectAll("rect").remove()

  mediaGenZSVG
    .selectAll("rect")
    .data(genZNewsSource)
    .join("rect")
    .attr("x", (d, i) => x2(i))
    .attr("y", (d) => y2(d.percent))
    .attr("height", d => y2(0) - y2(d.percent))
    .attr("width", x2.bandwidth());
  mediaBoomerSVG
    .selectAll("rect")
    .data(boomerNewsSource)
    .join("rect")
    .attr("x", (d, i) => x2(i) + 50)
    .attr("y", (d) => y2(d.percent))
    .attr("height", d => y2(0) - y2(d.percent))
    .attr("width", x2.bandwidth());
}
function headlineExample1() {
  mediaGenZSVG.selectAll("rect").remove();
  mediaBoomerSVG.selectAll("rect").remove();
}
function mediaExplore() {}

var mediaGenZSVG = d3
  .select("#media-gen-z-figure")
  .append("svg")
  .attr('width', '100%')
  .attr('height', window.innerHeight / 2);
var mediaBoomerSVG = d3
  .select("#media-boomer-figure")
  .append("svg")
  .attr('width', '100%')
  .attr('height', window.innerHeight / 2);
function init() {
  handleResize();

  scroller
    .setup({
      step: "#media-scrolly #media-article .step",
      offset: 0.5,
    })
    .onStepEnter(handleMediaStepEnter);

  window.addEventListener("resize", handleResize);
}
init();

