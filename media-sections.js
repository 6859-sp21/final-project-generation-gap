
var main = d3.select("main");
var mediaScrolly = main.select("#media-scrolly");
var mediaFigure = mediaScrolly.select("#media-figure");
var mediaArticle = mediaScrolly.select("#media-article");
var mediaStep = mediaArticle.selectAll(".step");


var scroller = scrollama();

function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.4);
    mediaStep.style("height", stepH + "px");
  
    var figureHeight = window.innerHeight * 0.8;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;
  
    mediaFigure
      .style("height", figureHeight + "px")
      .style("top", figureMarginTop + "px");
  
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
  }

  function handleMediaStepEnter(response) {
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
  
    console.log(d3.selectAll("#post-crash-scrolly #post-crash-article .step"));
  
    window.addEventListener("resize", handleResize);
  }
  init();