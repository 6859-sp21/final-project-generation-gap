
var main = d3.select("main");
var demographicsScrolly = main.select("#demographics-scrolly");
var demographicsFigure = demographicsScrolly.select("#demographics-figure");
var demographicsGenZFigure = demographicsFigure.select("#demographics-gen-z-figure");
var demographicsBoomerFigure = demographicsFigure.select("#demographics-boomer-figure");
var demographicsArticle = demographicsScrolly.select("#demographics-article");
var demographicsStep = demographicsArticle.selectAll(".step");


var scroller = scrollama();

var genzTitle = d3.select('#gen-z-title')
var boomerTitle = d3.select('#boomer-title')
var genzText = d3.select('#gen-z-text')
var boomerText = d3.select('#boomer-text')
var genzSVG = d3.select('#gen-z-area').append('svg').attr('width', 400).attr('height', 400)
var boomerSVG = d3.select('#boomer-area').append('svg').attr('width', 400).attr('height', 340)


function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.4);
    demographicsStep.style("height", stepH + "px");
  
    var demographicsFigureHeight = window.innerHeight / 2;
    var demographicsFigureMarginTop = (window.innerHeight - demographicsFigureHeight) / 2;

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
    demographicsFigure.select("p").text(response.index + 1);
    demographicsStep.classed("is-active", function(d, i) {
        return i === response.index;
      });

    console.log(response.index);
    if (response.index == 0) {
      genzSVG.selectAll('image').remove()
      boomerSVG.selectAll('image').remove()
      genzTitle.text('')
      boomerTitle.text('')
    } else if (response.index == 1) {
      genzTitle.text('GenZ Age Range')
      genzText.text('')
      genzSVG.selectAll('image').remove()
      genzSVG.append('image')
      .attr('xlink:href', 'img/genz_age.png')
      .attr('width', 370).attr('height', 300)
      boomerTitle.text('Boomer Age Range')
      boomerText.text('')
      boomerSVG.selectAll('image').remove()
      boomerSVG.append('image')
      .attr('xlink:href', 'img/boomer_age.png')
      .attr('width', 370).attr('height', 300)


    } else if (response.index == 2) {
      genzTitle.text('GenZ Population: 68 Million')
      genzText.text('')
      genzSVG.selectAll('image').remove()
      genzSVG.append('image')
      .attr('xlink:href', 'img/genz_population.png')
      .attr('width', 400).attr('height', 330)
      boomerTitle.text('Boomer Population: 71.6 Million')
      boomerText.text('')
      boomerSVG.selectAll('image').remove()
      boomerSVG.append('image')
      .attr('xlink:href', 'img/boomer_population.png')
      .attr('width', 400).attr('height', 330)

    } else if (response.index == 3) {
      genzTitle.text('Smartphones')
      genzText.text('')
      genzSVG.selectAll('image').remove()
      genzSVG.append('image')
      .attr('xlink:href', 'img/smartphone.png')
      .attr('width', 400).attr('height', 330)
      boomerTitle.text('Television')
      boomerText.text('')
      boomerSVG.selectAll('image').remove()
      boomerSVG.append('image')
      .attr('xlink:href', 'img/retrotv.png')
      .attr('width', 400).attr('height', 330)
    } else if (response.index == 4) {
      genzTitle.text('Black Lives Matter Movement')
      genzText.text('Started summer of 2013, when the Zoomers were around 13 years old.')
      genzSVG.selectAll('image').remove()
      genzSVG.append('image')
      .attr('xlink:href', 'img/blm.png')
      .attr('width', 300).attr('height', 300)
      boomerTitle.text('Civil Rights Movement')
      boomerText.text('From 1854-1968, when the Boomers were around 10 years old.')
      boomerSVG.selectAll('image').remove()
      boomerSVG.append('image')
      .attr('xlink:href', 'img/crm.png')
      .attr('width', 300).attr('height', 300)
    } else if (response.index == 5) {
      genzTitle.text('SpaceX Falcon 9')
      genzText.text('Launched November 15 2020, the first launch in a decade.')
      genzSVG.selectAll('image').remove()
      genzSVG.append('image')
      .attr('xlink:href', 'img/falcon.png')
      .attr('width', 300).attr('height', 250)
      boomerTitle.text('Mercury Freedom 7')
      boomerText.text('Launched May 5 1961, the first successful human launch into space')
      boomerSVG.selectAll('image').remove()
      boomerSVG.append('image')
      .attr('xlink:href', 'img/freedom.png')
      .attr('width', 300).attr('height', 250)
    } else if (response.index == 6) {
      
    }
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