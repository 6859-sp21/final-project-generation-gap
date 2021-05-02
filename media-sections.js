
var main = d3.select("main");
var mediaScrolly = main.select("#media-scrolly");
var mediaFigure = mediaScrolly.select("#media-figure");
var mediaGenZFigure = mediaFigure.select("#media-gen-z-figure");
var mediaBoomerFigure = mediaFigure.select("#media-boomer-figure");
var mediaArticle = mediaScrolly.select("#media-article");
var mediaStep = mediaArticle.selectAll(".step");


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
    mediaStep.classed("is-active", function(d, i) {
        return i === response.index;
      });

    console.log(response.index);
    if (response.index == 0) {
        mediaIntro();
    } else if (response.index == 1) {
      headlineExample();
    } else if (response.index == 2) {
      mediaExplore();
    }
  }
  function mediaIntro(){
    const mediaIntroX = d3.scaleBand().domain()
  }
  function headlineExample(){

  }
  function mediaExplore(){

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