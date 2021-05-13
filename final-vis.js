const final_margin = { top: 50, right: 50, bottom: 50, left: 100 },
  final_width = 1500 - final_margin.left - final_margin.right,
  final_height = 2500 - final_margin.top - final_margin.bottom,
//   width_survived = 700 - margin.left - margin.right,
//   height_survived = 300 - margin.top - margin.bottom,
  newsWidth = 70,
  newsHeight = 90,
  strokeWidth = 0,
  numRow = 10,
  //Square and Highlight Colors
  squareColor = "rgba(198, 198, 198, .5)",
  highlightColor = "grey"


var row = d3.scaleLinear().domain([0, numRow]).range([0, 1000]);

var svg = d3
  .select("#final_news")
  .append("svg")
  .attr("width", final_width + final_margin.left + final_margin.right)
  .attr("height", final_height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + final_margin.left + "," + final_margin.top + ")");

function render() {
    d3.csv("data/allsides.csv").then(function (data) {

    var g = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", "translate(" + final_margin.left + "," + final_margin.top + ")");

    // var newspapers = svg
    //     .selectAll("rect")
    //     .data(data)
    //     .enter()
        g.append("rect")
        .attr("x", (d, i) => {
        const n = i % numRow;
        return row(n);
        })
        .attr("y", (d, i) => {
        const n = Math.floor(i / numRow);
        return row(n);
        })
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("width", newsWidth)
        .attr("height", newsHeight)
        .attr("stroke-width", strokeWidth)
        .attr("stroke", squareColor)
        .attr("fill", squareColor)
        // .on("mouseover", handleMouseOver)
        // .on("mouseout", handleMouseOut_died)
        // .on("click", handleClick);
    
    g.append("text")
        .attr("x", (d, i) => {
            const n = i % numRow;
            console.log(row(n))
            return row(n);
            })
        .attr("y", (d, i) => {
            const n = Math.floor(i / numRow);
            return row(n);
            })
        .attr("dy", "1em")
        .style("color", "black")
        .text((d) => {console.log(d.Headline); return d.Headline})
        .attr("font-size","9px")
        .call(wrap, newsWidth);
        });
}

// source https://stackoverflow.com/questions/61767820/how-to-wrap-text-in-svg-vertically-in-d3-js
function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join("\n"));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join("\n"));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

render();
