const final_margin = { top: 50, right: 50, bottom: 50, left: 100 },
  final_width = 1700 - final_margin.left - final_margin.right,
  final_height = 2500 - final_margin.top - final_margin.bottom,
  //   width_survived = 700 - margin.left - margin.right,
  //   height_survived = 300 - margin.top - margin.bottom,
  newsWidth = 80,
  newsHeight = 100,
  maxLineNumber = 7,
  bylineMarginTop = 40,
  headerContainerWidth = 60,
  headerContainerMargin = { top: 1, left: 1 };
(strokeWidth = 0),
  (numRow = 10),
  (numFilters = 10),
  //Square and Highlight Colors
  (squareColor = "rgba(198, 198, 198, .5)"),
  (curSquareColor = squareColor),
  (highlightColor = "grey");

  var sourceData;

  d3.csv("./data/people.csv").then(function(data){
    sourceData = data;
    render();
  })

var biasColors = {
  Left: "#2E65A0",
  "Lean Left": "#9EC8EB",
  Center: "#9766A0",
  "Lean Right": "#CA9A98",
  Right: "#CB2127",
};

var row = d3.scaleLinear().domain([0, numRow]).range([0, 1100]);

var filters = {
  bias: [],
  topic: [],
};

var filtersDefault = {
  bias: ["Left", "Lean Left", "Center", "Lean Right", "Right"],
  topic: ["covid", "climate+change", "blm", "guns", "economy"],
};

var svg = d3
  .select("#final_news")
  .append("svg")
  .attr("width", final_width + final_margin.left + final_margin.right)
  .attr("height", final_height + margin.top + margin.bottom);
//   .append("g")
//   .attr("transform", "translate(" + final_margin.left + "," + final_margin.top + ")");

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function updateFilter() {
  biasFilter = ["Left", "Lean Left", "Center", "Lean Right", "Right"];
  topicFilter = ["covid", "climate+change", "blm", "guns", "economy"];

  console.log(document.getElementById("Left").checked);

  filters["bias"] = biasFilter.map((f) => {
    if (document.getElementById(f).checked == true) return f;
  });
  filters["topic"] = topicFilter.map((f) => {
    if (document.getElementById(f).checked == true) return f;
  });

  noSelectCount = 0;
  filterTitle = "";
  for (filterKey in filters) {
    var filterCount = 0;
    var curFilter = filters[filterKey];
    for (f in curFilter) {
      if (curFilter[f] === undefined) filterCount += 1;
      // else {
      //   filterTitle += titleMap[curFilter[f].toString()] + ", ";
      // }
    }
    noSelectCount += filterCount;
    if (filterCount === curFilter.length) {
      filters[filterKey] = filtersDefault[filterKey];
    }
  }

  if (noSelectCount === numFilters) {
    filters["bias"] = [];
    filters["topic"] = [];
  }

  console.log("filters", filters);

  return filters;
}

function highlighted(data) {
  filtered_data = data.filter((d) => fitsFilter(d));
  rest_of_data = data.filter((d) => !filtered_data.includes(d));

  const all_data = {};
  var i = 0;
  for (key in filtered_data) {
    if (filtered_data.hasOwnProperty(key)) {
      // all_data[i] = filtered_data[key];
      all_data[filtered_data[key].Headline] =
        biasColors[filtered_data[key].Bias];
      i++;
    }
  }
  for (key in rest_of_data) {
    if (rest_of_data.hasOwnProperty(key)) {
      // all_data[i] = rest_of_data[key];
      all_data[rest_of_data[key].Headline] = squareColor;
      // i++;
    }
  }
  return all_data;
}
function fitsFilter(d) {
  return filters["bias"].includes(d.Bias) && filters["topic"].includes(d.Topic);
}

// function render() {
//   d3.csv("data/allsides.csv").then(function (data) {
//     svg.selectAll("g").remove();
//     // svg.selectAll("image").remove();
//     // svg.selectAll("text").remove();
//     highlightedData = highlighted(data)
//     updateFilter()
/*Person Card Dropdowns Fix for all dropdowns*/
// Listening for Dropdown Clicks
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
  console.log(sourceData);
  var person = {
   age: "65+",
    region: "Midwest",
    metro:"Metropolitan",
    sex:"Female",
    education:"College graduate+",
    race:"White"
  };
  result = sourceData.filter((d) => {
    d.F_AGECAT == person.age && 
    d.F_CREGION == person.region &&
      d.F_SEX == person.sex &&
      d.F_EDUCCAT == person.education &&
      d.F_RACECMB == person.race &&
      d.F_METRO == person.metro;
  });
  var randomPerson = sourceData[Math.floor(Math.random() * sourceData.length)]
  console.log(randomPerson);
  var sources = []
  for (const property in randomPerson) {
    if (randomPerson[property] == "Yes"){
      sources.push(property);
    }
  }
  console.log(sources);

  d3.csv("./data/allsides.csv").then(function (data) {
    svg.selectAll("g").remove();
    highlightedData = highlighted(data);
    updateFilter();

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
    // g.append("rect")
    //   .attr("x", (d, i) => {
    //     const n = i % numRow;
    //     return row(n);
    //   })
    //   .attr("y", (d, i) => {
    //     const n = Math.floor(i / numRow);
    //     return row(n);
    //   })
    //   .attr("rx", 1)
    //   .attr("ry", 1)
    //   .attr("width", newsWidth)
    //   .attr("height", newsHeight)
    //   .attr("stroke-width", strokeWidth)
    //   .attr("stroke", squareColor)
    //   .attr("fill", squareColor)
    //   .on("mouseover", handleMouseOver)
    //   .on("mouseout", handleMouseOut)
    //   // .on("mouseover", handleMouseOver)
    //   // .on("mouseout", handleMouseOut_died)
    //   .on("click", handleClick);

    g.append("image")
      .attr("xlink:href", "img/newspaper_icon.png")
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
      .attr("fill", squareColor);

    g.append("text")
      .attr("x", (d, i) => {
        const n = i % numRow;
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numRow);
        return row(n);
      })
      .attr("dy", "1em")
      .style("color", "black")
      .text((d) => {
        // console.log(d.Headline);
        return d.Source;
      })
      .attr("font-size", "10px")
      .call(wrap, headerContainerWidth);

    //   g.append("text")
    //   .attr("x", (d, i) => {
    //     const n = i % numRow;
    //     console.log('ugh');
    //     return row(n);
    //   })
    //   .attr("y", (d, i) => {
    //     const n = Math.floor(i / numRow);
    //     return row(n)+bylineMarginTop;
    //   })
    //   .attr("dy", "1em")
    //   .style("color", "black")
    //   .text((d) => {
    //     console.log(d.Headline);
    //     return d.Byline;
    //   })
    //   .call(wrap, headerContainerWidth);

    g.append("rect")
      //   .attr("xlink:href", "img/newspaper_icon.png")
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
      //   .attr("fill", (d) => {return biasColors[d.Bias]})
      .attr("fill", (d) => {
        return highlightedData[d.Headline];
      })
      .attr("opacity", 0.3)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);
  });

  // MouseOvers
  function handleMouseOver(d) {
    d3.select(this).style("fill", d3.select(this).attr("fill"));
    d3.select(this).style("opacity", 0.7);

    // tooltip
    tooltip.transition().duration(30).style("opacity", 1);
    tooltip
      .html(
        `<div class='tooltip-header' style='background:${
          biasColors[d.Bias]
        }; opacity:.8'> ${d.Headline}, ${d.Source} </div> <br> 
        <div class='tooltip-header2'> Headlines From Different Sources </div>
        <div class='tooltip-sources' style='color:${biasColors[d.Bias]}'> ${
          d.Headline
        } </div>
        <div class='tooltip-sources' style='color:${biasColors[d.Bias]}'> ${
          d.Headline
        } </div>
        <div class='tooltip-sources' style='color:${biasColors[d.Bias]}'> ${
          d.Headline
        } </div>
        <div class='tooltip-more'> Click to read more </div>`
      )
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY - 20 + "px");
    //   .style("background", biasColors[d.Bias]);
    d3.select(this).attr("class", "info").datum(d).style("cursor", "pointer");
  }

  function handleMouseOut(d) {
    // d3.select(this).style("fill", function () {
    //   return d3.select(this).attr("id") == "is-active"
    //     ? diedColor
    //     : squareColor;
    // });
    d3.select(this).style("opacity", 0.3);
    d3.select(this).style("fill", d3.select(this).attr("fill"));

    // tooltip
    tooltip.transition().duration(30).style("opacity", 0);
    d3.select(this).attr("class", null);
  }

  function handleClick(d) {
    $("#myModal").modal({
      fadeDuration: 300,
    }).html(`<h1 id="source_name">${d.Source}</h1><h1 id="modal_name">${
      d.Headline
    }</h1>
    <h1 id="modal_byline">${d.Byline}</h1>                  
    <h1 id="modal_info">Date: ${d.Date}</h1>
    <h1 id="modal_info">Topic: ${d.Topic}</h1>
    <h1 id="modal_info" style="color:${biasColors[d.Bias]}">Media Bias: ${
      d.Bias
    }</h1>
    <div style="text-align:center"><a href=${
      d.URL
    } class="button1" target="blank" style="background-color:${
      biasColors[d.Bias]
    }">Read this story</a></div>
    <h1 id="modal_name">Recommended Reads:</h1>  
    <div style="align-items: center; flex-direction: column; display: flex;">
    <div class="line-container">
    <span class="line arrow-left"></span>
    <label>Media Bias</label>
    <span class="line arrow-right"></span>
  </div>
    <div style="justify-items: space-between; flex-direction: row; display: flex;">

    <div style="text-align:center;"><a style="background-color:${
      biasColors["Left"]
    }" href=${d.URL} class="button1" target="blank">Read this story</a></div> 

    <div style="text-align:center;"><a style="background-color:${
      biasColors["Center"]
    }" href=${d.URL} class="button1" target="blank">Read this story</a></div> 

    <div style="text-align:center;"><a style="background-color:${
      biasColors["Right"]
    }" href=${d.URL} class="button1" target="blank">Read this story</a></div> 
    
    </div>
    
    </div>
    `);
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
        .attr("dx", headerContainerMargin.left + "em")
        .attr("dy", headerContainerMargin.top + dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join("\n"));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join("\n"));
        line = [word];
        if (lineNumber < maxLineNumber) {
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dx", headerContainerMargin.left + "em")
            .attr(
              "dy",
              ++lineNumber * lineHeight + headerContainerMargin.top + dy + "em"
            )
            .text(word);
        } else {
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dx", headerContainerMargin.left + "em")
            .attr(
              "dy",
              ++lineNumber * lineHeight + headerContainerMargin.top + dy + "em"
            )
            .text("...");
          break;
        }
      }
    }
  });
}

render();
