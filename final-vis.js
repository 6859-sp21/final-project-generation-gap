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
  highlightColor = "grey";

var row = d3.scaleLinear().domain([0, numRow]).range([0, 1000]);

var svg = d3
  .select("#final_news")
  .append("svg")
  .attr("width", final_width + final_margin.left + final_margin.right)
  .attr("height", final_height + margin.top + margin.bottom);
//   .append("g")
//   .attr("transform", "translate(" + final_margin.left + "," + final_margin.top + ")");

/*Person Card Dropdowns Fix for all dropdowns*/
//Listening for Dropdown Clicks
[...document.querySelectorAll(".custom-select-wrapper")].forEach(function (
  item
) {
  item.addEventListener("click", function () {
    this.querySelector(".custom-select").classList.toggle("open");
  });
});
//Listening for Option Clicks
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(
        ".custom-select__trigger span"
      ).textContent = this.textContent;
    }
  });
}
//Listening for Clicking Outside Dropdown
window.addEventListener("click", function (e) {
  [...document.querySelectorAll(".custom-select")].forEach(function (item) {
    if (!item.contains(e.target)) {
      item.classList.remove("open");
    }
  });
});

// RENDER
function render() {
  d3.csv("data/allsides.csv").then(function (data) {
    var g = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr(
        "transform",
        "translate(" + final_margin.left + "," + final_margin.top + ")"
      );

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
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      // .on("mouseover", handleMouseOver)
      // .on("mouseout", handleMouseOut_died)
      .on("click", handleClick);

    g.append("text")
      .attr("x", (d, i) => {
        const n = i % numRow;
        console.log(row(n));
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numRow);
        return row(n);
      })
      .attr("dy", "1em")
      .style("color", "black")
      .text((d) => {
        console.log(d.Headline);
        return d.Headline;
      })
      .attr("font-size", "9px")
      .call(wrap, newsWidth);
  });

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var bias_colors = {
    Left: "#2E65A0",
    "Lean Left": "#9EC8EB",
    Center: "#9766A0",
    "Lean Right": "#CA9A98",
    Right: "#CB2127",
  };
  // MouseOvers
  function handleMouseOver(d) {
    d3.select(this).style("fill", "black");
    d3.select(this).style("opacity", 0.5);

    // tooltip
    tooltip.transition().duration(30).style("opacity", 1);
    tooltip
      .html(
        `${d.Headline}, ${d.Source}<br><div class='tooltip-more'> Click to read more </div>`
      )
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY - 20 + "px")
      .style("background", bias_colors[d.Bias]);
    d3.select(this).attr("class", "info").datum(d).style("cursor", "pointer");
  }

  function handleMouseOut(d) {
    // d3.select(this).style("fill", function () {
    //   return d3.select(this).attr("id") == "is-active"
    //     ? diedColor
    //     : squareColor;
    // });
    d3.select(this).style("opacity", 1);
    d3.select(this).style("fill", squareColor);

    // tooltip
    tooltip.transition().duration(30).style("opacity", 0);
    d3.select(this).attr("class", null);
  }

  function handleClick(d) {
    $("#myModal").modal({
      fadeDuration: 300,
    }).html(`<h1 id="modal_name">${d.Headline}</h1>
                      <h1 id="modal_info" style="color:${
                        bias_colors[d.Bias]
                      }">${d.Bias}</h1>
                      <h1 id="modal_info">Source: ${d.Source}</h1>
                      <h1 id="modal_info">Date: ${d.Date}</h1>
                      <div style="text-align:center"><a href=${
                        d.URL
                      } class="button1" target="blank">Read this story</a></div>`);
  }
}

// source https://stackoverflow.com/questions/61767820/how-to-wrap-text-in-svg-vertically-in-d3-js
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join("\n"));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join("\n"));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

render();
