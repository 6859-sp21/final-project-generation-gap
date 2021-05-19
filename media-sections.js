var main = d3.select("main");
var mediaScrolly = main.select("#media-scrolly");
var mediaFigure = mediaScrolly.select("#media-figure");
var mediaGenZFigure = mediaFigure.select("#media-gen-z-figure");
var mediaBoomerFigure = mediaFigure.select("#media-boomer-figure");
var mediaArticle = mediaScrolly.select("#media-article");
var mediaStep = mediaArticle.selectAll(".step");

var genZColor = "#FFA67D";
var boomerColor = "#00A08F";
var textColor = "#282828";

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
var margin = { top: 50, right: 0, bottom: 50, left: 50 };

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

  console.log(response.index);
  if (response.index == 0) {
    stepReset();
    followNews();
  } else if (response.index == 1) {
    stepReset();
    newsOutlet1();
  } 
  else if (response.index == 2) {
    stepReset();
    newsOutlet3();
  } else if (response.index == 3) {
    stepReset();
    areaChart1();
  } else if (response.index == 4) {
    stepReset();
    headlineExample1();
  } else if (response.index == 5) {
    stepReset();
    headlineExample2();
  } else if (response.index == 6) {
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
  mediaGenZSVG.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("%Gen Z")
    .attr("font-family", "Roboto");;
  mediaBoomerSVG.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("%Boomer")
    .attr("font-family", "Roboto");;

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
    .attr("fill", (d) => {
      if (d.category == "Very Closely" || d.category == "Somewhat Closely") {
        return genZColor;
      }
      return textColor;
    });

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
    .attr("fill", (d) => {
      if (d.category == "Very Closely" || d.category == "Somewhat Closely") {
        return boomerColor;
      }
      return textColor;
    });
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
        .attr("fill", (d) => {
          if (d.Source == "CNN" || d.Source == "New York Times") {
            return genZColor;
          }
          return textColor;
        });
   
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
      mediaGenZSVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("%Gen Z uses News Source")
      .attr("font-family", "Roboto");;
      mediaBoomerSVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("%Boomer uses News Source")
      .attr("font-family", "Roboto");;
      mediaBoomerSVG
        .selectAll("rect")
        .data(boomerData)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.Yes))
        .attr("height", (d) => y(0) - y(d.Yes))
        .attr("width", x.bandwidth())
        .attr("fill", (d) => {
          if (d.Source == "CNN" || d.Source == "New York Times") {
            return boomerColor;
          }
          return textColor;
        });
      
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
  mediaGenZSVG
    .selectAll("rect")
    .attr("fill", (d) => {
      if (d.Source == "New York Times") {
        return genZColor;
      } else {
        return "#282828";
      }
    })
    .transition();
    mediaGenZSVG.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("%Gen Z uses News Source")
    .attr("font-family", "Roboto");;
    mediaBoomerSVG.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("%Boomer uses News Source")
    .attr("font-family", "Roboto");;
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
        .attr("fill", (d) => {
          if (d.Source == "CNN") {
            return genZColor;
          }
          return textColor;
        });
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
        .attr("fill", (d) => {
          if (d.Source == "Fox ") {
            return boomerColor;
          }
          return textColor;
        })
        .transition();
        mediaGenZSVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("%Gen Z uses News Source")
        .attr("font-family", "Roboto");
        mediaBoomerSVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("%Boomer uses News Source")
        .attr("font-family", "Roboto");;
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
function areaChart1() {
  d3.csv("./data/cnn.csv").then(function (data) {
    var x = d3.scaleBand().range([margin.left, width]);
    x.domain([
      "Very liberal",
      "Liberal",
      "Moderate",
      "Conservative",
      "Very conservative",
    ]);

    mediaGenZSVG
      .append("g")
      .attr("transform", `translate(${-margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, 2500])
      .range([height - margin.bottom, margin.top]);
    mediaGenZSVG
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    curve = d3.curveLinear;
    area = d3
      .area()
      .curve(curve)
      .x((d) => {
        return x(d.F_IDEO);
      })
      .y0(y(0))
      .y1((d) => y(d.QKEY));
    // Add the area
    mediaGenZSVG
      .append("path")
      .datum(data)
      .attr("fill", "#FFD3BE")
      .attr("stroke", genZColor)
      .attr("stroke-width", 1.5)
      .attr("d", area);
    mediaGenZSVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", "-2")
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Readers")
      .attr("font-family", "Roboto");;
      
  });
  d3.csv("./data/fox.csv").then(function (data) {
    var x = d3.scaleBand().range([margin.left, width]);
    x.domain([
      "Very liberal",
      "Liberal",
      "Moderate",
      "Conservative",
      "Very conservative",
    ]);

    mediaBoomerSVG
      .append("g")
      .attr("transform", `translate(${-margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, 2500])
      .range([height - margin.bottom, margin.top]);
    mediaBoomerSVG
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    curve = d3.curveLinear;
    area = d3
      .area()
      .curve(curve)
      .x((d) => {
        return x(d.F_IDEO);
      })
      .y0(y(0))
      .y1((d) => y(d.QKEY));
    // Add the area
    mediaBoomerSVG
      .append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", boomerColor)
      .attr("stroke-width", 1.5)
      .attr("d", area);
    mediaBoomerSVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -2)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Readers")
      .attr("font-family", "Roboto");;
  });
}
function headlineExample1() {
  mediaGenZFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("CNN");
  mediaGenZFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
    .text(
      "GOP senators offer Covid-19 relief counterproposal to force talks with White House back to middle"
    );

  mediaBoomerFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("Fox");
  mediaBoomerFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
    .text(
      "GOP senators to meet Biden Monday on coronavirus relief as Dems ready to pass bill without Republican support"
    );
  
}
function headlineExample2() {
  mediaBoomerFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("Fox");
  mediaBoomerFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
    .text(
      "Biden's spending, tax plans will have 'bumps along the way': Economic Advisers chair"
    );
  mediaGenZFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("CNN");
  mediaGenZFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
    .text(
      "Here's how Biden wants to raise taxes on the wealthy and corporations"
    );
}
function headlineExample3() {
  mediaGenZFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("CNN");
  mediaGenZFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
    .text(
      "Biden makes the economic case for fighting climate change on second day of virtual summit"
    );

  mediaBoomerFigure
    .insert("span", ":nth-child(2)")
    .attr("id", "headline-example")
    .text("Fox");
  mediaBoomerFigure
    .selectAll("span")
    .append("div")
    .attr("id", "headline-text")
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
  mediaGenZSVG.selectAll("path").remove();
  mediaBoomerSVG.selectAll("path").remove();
  mediaGenZFigure.selectAll("span").remove();
  mediaBoomerFigure.selectAll("span").remove();
}
function init() {
  handleResize();

  scroller
    .setup({
      step: "#media-scrolly #media-article .step",
      offset: 0.7,
    })
    .onStepEnter(handleMediaStepEnter);

  window.addEventListener("resize", handleResize);
}
init();
