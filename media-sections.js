var main = d3.select("main");
var mediaScrolly = main.select("#media-scrolly");
var mediaFigure = mediaScrolly.select("#media-figure");
var mediaGenZFigure = mediaFigure.select("#media-gen-z-figure");
var mediaBoomerFigure = mediaFigure.select("#media-boomer-figure");
var mediaArticle = mediaScrolly.select("#media-article");
var mediaStep = mediaArticle.selectAll(".step");

var mediaGenZSVG = d3
  .select("#media-gen-z-figure")
  .append("svg")
  .attr("width", "100%")
  .attr("height", window.innerHeight / 2);
var mediaBoomerSVG = d3
  .select("#media-boomer-figure")
  .append("svg")
  .attr("width", "100%")
  .attr("height", window.innerHeight / 2);

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

const genZNewsOutlet = [
  { source: "MSNBC", percent: 0.09 },
  { source: "CNN", percent: 0.16 },
  { source: "NYT", percent: 0.21 },
  { source: "Washington\n Post", percent: 0.15 },
  { source: "National TV", percent: 0.32 },
  { source: "NPR", percent: 0.16 },
  { source: "Fox", percent: 0.11 },
  { source: "Talk Radio", percent: 0.06 },
];
const boomerNewsOutlet = [
  { source: "MSNBC", percent: 0.18 },
  { source: "CNN", percent: 0.23 },
  { source: "NYT", percent: 0.12 },
  { source: "Washington\n Post", percent: 0.1 },
  { source: "National TV", percent: 0.38 },
  { source: "NPR", percent: 0.14 },
  { source: "Fox", percent: 0.33 },
  { source: "Talk Radio", percent: 0.15 },
];

const genZNewsSource = [
  { source: "Print News", percent: 0.02 },
  { source: "Radio", percent: 0.04 },
  { source: "Local TV", percent: 0.09 },
  { source: "National TV", percent: 0.06 },
  { source: "Cable TV", percent: 0.07 },
  { source: "Social Media", percent: 0.41 },
  { source: "News Website", percent: 0.3 },
];

const boomerNewsSource = [
  { source: "Print News", percent: 0.06 },
  { source: "Radio", percent: 0.06 },
  { source: "Local TV", percent: 0.16 },
  { source: "National TV", percent: 0.24 },
  { source: "Cable TV", percent: 0.3 },
  { source: "Social Media", percent: 0.03 },
  { source: "News Website", percent: 0.16 },
];

var width = 500;
var height = 500;
var margin = { top: 50, right: 0, bottom: 50, left: 40 };

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
  stepReset();
  mediaFigure.select("p").text(response.index + 1);
  mediaStep.classed("is-active", function (d, i) {
    return i === response.index;
  });
  mediaGenZSVG.append("text").text("Generation Z").attr("x", "30%").attr("y", "10%");
  mediaBoomerSVG.append("text").text("Baby Boomer").attr("x", "30%").attr("y", "10%");;

  console.log(response.index);
  if (response.index == 0) {
  } else if (response.index == 1) {
    followNews();
  } else if (response.index == 2) {
    newsSource();
  } else if (response.index == 3) {
    newsOutlet();
  } else if (response.index == 4) {
    headlineExample1();
  } else if (response.index == 5) {
    headlineExample2();
  } else if (response.index == 6) {
    headlineExample3();
  } else if (response.index == 7) {
    mediaExplore();
  }
}
function followNews() {
  var y = d3
    .scaleLinear()
    .domain([0, 1])
    .nice()
    .range([height - margin.bottom, margin.top]);
  var x = d3
    .scaleBand()
    .domain(d3.range(genZFollowNews.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  mediaGenZSVG
    .selectAll("rect")
    .data(genZFollowNews)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      console.log(i);
      return x(i);
    })
    .attr("y", (d) => y(d.percent))
    .attr("height", (d) => y(0) - y(d.percent))
    .attr("width", x.bandwidth())
    .transition();

    var genZxAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => genZFollowNews[i].category)
        .tickSizeOuter(0)
    );
  var genZyAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, genZFollowNews.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(genZFollowNews.percent)
      );
  mediaGenZSVG.append("g").call(genZxAxis);
  mediaGenZSVG.append("g").call(genZyAxis);
  mediaBoomerSVG
    .selectAll("rect")
    .data(boomersFollowNews)
    .enter()
    .append("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.percent))
    .attr("height", (d) => y(0) - y(d.percent))
    .attr("width", x.bandwidth());
    var boomerXAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => boomersFollowNews[i].category)
        .tickSizeOuter(0)
    );
  var boomerYAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, boomersFollowNews.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(boomersFollowNews.percent)
      );
  mediaBoomerSVG.append("g").call(boomerXAxis);
  mediaBoomerSVG.append("g").call(boomerYAxis);
}
function newsSource() {
  var y = d3
    .scaleLinear()
    .domain([0, 1])
    .nice()
    .range([height - margin.bottom, margin.top]);
  var x = d3
    .scaleBand()
    .domain(d3.range(genZNewsSource.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  mediaGenZSVG
    .selectAll("rect")
    .data(genZNewsSource)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.percent))
    .attr("height", (d) => y(0) - y(d.percent))
    .attr("width", x.bandwidth());
  var genZxAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => genZNewsSource[i].source)
        .tickSizeOuter(0)
    );
  var genZyAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, genZNewsSource.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(genZNewsSource.percent)
      );
  mediaGenZSVG.append("g").call(genZxAxis);
  mediaGenZSVG.append("g").call(genZyAxis);
  mediaBoomerSVG
    .selectAll("rect")
    .data(boomerNewsSource)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.percent))
    .attr("height", (d) => y(0) - y(d.percent))
    .attr("width", x.bandwidth());
  var boomerXAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => boomerNewsSource[i].source)
        .tickSizeOuter(0)
    );
  var boomerYAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, boomerNewsSource.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(boomerNewsSource.percent)
      );
  mediaBoomerSVG.append("g").call(boomerXAxis);
  mediaBoomerSVG.append("g").call(boomerYAxis);

}
function newsOutlet() {
  var y2 = d3
    .scaleLinear()
    .domain([0, 1])
    .nice()
    .range([height - margin.bottom, margin.top]);
  var x2 = d3
    .scaleBand()
    .domain(d3.range(genZNewsOutlet.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  mediaGenZSVG
    .selectAll("rect")
    .data(genZNewsOutlet)
    .join("rect")
    .attr("x", (d, i) => x2(i))
    .attr("y", (d) => y2(d.percent))
    .attr("height", (d) => y2(0) - y2(d.percent))
    .attr("width", x2.bandwidth());

  var genZxAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x2)
        .tickFormat((i) => genZNewsOutlet[i].source)
        .tickSizeOuter(0)
    );
  var genZyAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y2).ticks(null, genZNewsOutlet.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(genZNewsOutlet.percent)
      );
  mediaGenZSVG.append("g").call(genZyAxis);
  mediaGenZSVG.append("g").call(genZxAxis);

  mediaBoomerSVG
    .selectAll("rect")
    .data(boomerNewsOutlet)
    .join("rect")
    .attr("x", (d, i) => x2(i))
    .attr("y", (d) => y2(d.percent))
    .attr("height", (d) => y2(0) - y2(d.percent))
    .attr("width", x2.bandwidth());
  var boomerxAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x2)
        .tickFormat((i) => boomerNewsOutlet[i].source)
        .tickSizeOuter(0)
    );
  mediaBoomerSVG.append("g").call(boomerxAxis);
  var boomerYAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y2).ticks(null, boomerNewsOutlet.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(boomerNewsOutlet.percent)
      );
  mediaBoomerSVG.append("g").call(boomerYAxis);
}
function headlineExample1() {
  mediaBoomerSVG
    .append("text")
    .text(
      "GOP senators offer Covid-19 relief counterproposal to force talks with White House back to middle"
    )
    .attr("x", "5%")
    .attr("y", "30%");
  mediaGenZSVG
    .append("text")
    .text(
      "GOP senators to meet Biden Monday on coronavirus relief as Dems ready to pass bill without Republican support"
    )
    .attr("x", "5%")
    .attr("y", "30%");
}
function headlineExample2() {
  mediaBoomerSVG
    .append("text")
    .text(
      "Biden's spending, tax plans will have 'bumps along the way': Economic Advisers chair"
    )
    .attr("x", "5%")
    .attr("y", "30%");
  mediaGenZSVG
    .append("text")
    .text(
      "Here's how Biden wants to raise taxes on the wealthy and corporations"
    )
    .attr("x", "5%")
    .attr("y", "30%");
}
function headlineExample3() {
  mediaGenZSVG
    .append("text")
    .text(
      "Biden makes the economic case for fighting climate change on second day of virtual summit"
    )
    .attr("x", "5%")
    .attr("y", "30%");
  mediaBoomerSVG
    .append("text")
    .text(
      "Biden avoids confronting China over climate in Earth Day speech with world leaders"
    )
    .attr("x", "5%")
    .attr("y", "30%");
}

function stepReset() {
  mediaGenZSVG.selectAll("rect").remove();
  mediaBoomerSVG.selectAll("rect").remove();
  mediaGenZSVG.selectAll("g").remove();
  mediaBoomerSVG.selectAll("g").remove();
  mediaGenZSVG.selectAll("text").remove();
  mediaBoomerSVG.selectAll("text").remove();
}
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
