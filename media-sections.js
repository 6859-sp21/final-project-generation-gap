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
  .attr("height", window.innerHeight);
var mediaBoomerSVG = d3
  .select("#media-boomer-figure")
  .append("svg")
  .attr("width", "100%")
  .attr("height", window.innerHeight);

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

var width = 600;
var height = 500;
var margin = { top: 50, right: 0, bottom: 50, left: 40 };

var scroller = scrollama();

function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.4);
  mediaStep.style("height", stepH + "px");

  var mediaFigureHeight = window.innerHeight * 0.8;
  var mediaFigureMarginTop = (window.innerHeight - mediaFigureHeight) / 2;
  width = window.innerWidth * 0.4;
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
  mediaGenZSVG
    .append("text")
    .text("Generation Z")
    .attr("x", "30%")
    .attr("y", "10%");
  mediaBoomerSVG
    .append("text")
    .text("Baby Boomer")
    .attr("x", "30%")
    .attr("y", "10%");

  console.log(response.index);
  if (response.index == 0) {
    stepReset();
    mediaGenZSVG.selectAll("text").remove();
    mediaBoomerSVG.selectAll("text").remove();
  } else if (response.index == 1) {
    stepReset();
    followNews();
  } else if (response.index == 2) {
    stepReset();
    newsOutlet1();
  } else if (response.index == 3) {
    newsOutlet2();
  } else if (response.index == 4) {
    stepReset();
    newsOutlet3();
  } else if (response.index == 5) {
    stepReset();
    headlineExample1();
  } else if (response.index == 6) {
    stepReset();
    headlineExample2();
  } else if (response.index == 7) {
    stepReset();
    headlineExample3();
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
      return x(i);
    })
    .attr("y", (d) => y(d.percent))
    .attr("height", (d) => y(0) - y(d.percent))
    .attr("width", x.bandwidth())
    .attr("fill", "#3b3b3b");

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
    .attr("width", x.bandwidth())
    .attr("fill", "#3b3b3b");
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
function newsOutlet1() {
  d3.csv("./data/genZNewsSource2.csv").then(function (genZData) {
    d3.csv("./data/boomerNewsSource2.csv").then(function (boomerData) {
      var y = d3
        .scaleLinear()
        .domain([0, 1])
        .nice()
        .range([height - margin.bottom, margin.top]);
      var x = d3
        .scaleBand()
        .domain(d3.range(genZData.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
      mediaGenZSVG
        .selectAll("rect")
        .data(genZData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.Yes))
        .attr("height", (d) => y(0) - y(d.Yes))
        .attr("width", x.bandwidth())
        .attr("fill", "#282828");
      var genZxAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickFormat((i) => genZData[i].Source)
            .tickSizeOuter(0)
        );
      var genZyAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, genZData.format))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(genZData.Yes)
          );
      mediaGenZSVG.append("g").call(genZxAxis);
      mediaGenZSVG.append("g").call(genZyAxis);
      mediaBoomerSVG
        .selectAll("rect")
        .data(boomerData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.Yes))
        .attr("height", (d) => y(0) - y(d.Yes))
        .attr("width", x.bandwidth())
        .attr("fill", "#282828");
      var boomerXAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickFormat((i) => boomerData[i].Source)
            .tickSizeOuter(0)
        );
      var boomerYAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, boomerData.format))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(genZData.Yes)
          );
      mediaBoomerSVG.append("g").call(boomerXAxis);
      mediaBoomerSVG.append("g").call(boomerYAxis);
    });
  });
}
function newsOutlet2() {
  mediaGenZSVG.selectAll("rect")
  .attr("fill", (d) =>{
    if (d.Source == "New York Times"){
      return "goldenrod";
    } else {
      return "#282828";
    }
  })
}

function newsOutlet3() {
  d3.csv("./data/genZNewsSource2.csv").then(function (genZData) {
    d3.csv("./data/boomerNewsSource2.csv").then(function (boomerData) {
      
      var y = d3
        .scaleLinear()
        .domain([0, 1])
        .nice()
        .range([height - margin.bottom, margin.top]);
      var x = d3
        .scaleBand()
        .domain(d3.range(genZData.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
      mediaGenZSVG
        .selectAll("rect")
        .data(genZData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.Yes))
        .attr("height", (d) => y(0) - y(d.Yes))
        .attr("width", x.bandwidth())
        .attr("fill", "#282828");
      var genZxAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickFormat((i) => genZData[i].Source)
            .tickSizeOuter(0)
        );
      var genZyAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, genZData.format))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(genZData.Yes)
          );
      mediaGenZSVG.append("g").call(genZxAxis);
      mediaGenZSVG.append("g").call(genZyAxis);
      mediaBoomerSVG
        .selectAll("rect")
        .data(boomerData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.Yes))
        .attr("height", (d) => y(0) - y(d.Yes))
        .attr("width", x.bandwidth())
        .attr("fill", "#282828");
      var boomerXAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickFormat((i) => boomerData[i].Source)
            .tickSizeOuter(0)
        );
      var boomerYAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, boomerData.format))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(genZData.Yes)
          );
      mediaBoomerSVG.append("g").call(boomerXAxis);
      mediaBoomerSVG.append("g").call(boomerYAxis);
    });
  });
}
function headlineExample1() {
  mediaBoomerFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "GOP senators offer Covid-19 relief counterproposal to force talks with White House back to middle"
    );

  mediaGenZFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "GOP senators to meet Biden Monday on coronavirus relief as Dems ready to pass bill without Republican support"
    );
}
function headlineExample2() {
  mediaBoomerFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "Biden's spending, tax plans will have 'bumps along the way': Economic Advisers chair"
    );
  mediaGenZFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "Here's how Biden wants to raise taxes on the wealthy and corporations"
    );
}
function headlineExample3() {
  mediaGenZFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "Biden makes the economic case for fighting climate change on second day of virtual summit"
    ).attr("padding-top", '10rem')

  mediaBoomerFigure
  .insert("span", ":first-child")
  .attr('id', 'headline-example')
    .text(
      "Biden avoids confronting China over climate in Earth Day speech with world leaders"
    );
}

function stepReset() {
  mediaGenZSVG.selectAll("rect").remove();
  mediaBoomerSVG.selectAll("rect").remove();
  mediaGenZSVG.selectAll("g").remove();
  mediaBoomerSVG.selectAll("g").remove();
  mediaGenZSVG.selectAll("text").remove();
  mediaBoomerSVG.selectAll("text").remove();
  mediaGenZFigure.selectAll("span").remove();
  mediaBoomerFigure.selectAll("span").remove();
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
