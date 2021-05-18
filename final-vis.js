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

sourcesMap = {
  CNN: ["CNN (Online News)", "CNN (Opinion)"],
  "The New York Times": ["New York Times (Opinion)", "New York Times (News)"],
  "NBC News": ["NBC News (Online)"],
  "CBS News": ["CBS News (Online)"],
  "ABC News": ["ABC News (online)"],
  "Washington Post": ["Washington Post"],
  NPR: ["NPR (Opinion)", "NPR (Online News)"],
  BBC: ["BBC News"],
  "USA TODAY": ["USA TODAY"],
  "The Wall Street Journal": [
    "Wall Street Journal (News)",
    "Wall Street Journal (Opinion)",
  ],
  "Fox News": ["Fox News (Online News)"],
  // "Drudge Report",
  // "TheBlaze.com",
  BrietBart: ["Breitbart News"],
};

var sourceData;
var sources;

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
  topic: ["covid", "climate change", "blm", "guns", "economy"],
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
  topicFilter = ["covid", "climate change", "blm", "guns", "economy"];

  console.log(document.getElementById("Left").checked);

  //Change color of highlight on click
  biasFilter.forEach(function (item) {
    label = document.querySelector(`[value="${item}"]`);
    if (document.getElementById(item).checked == true) {
      label.setAttribute("style", `background-color: ${biasColors[item]};`);
    } else {
      label.setAttribute("style", `background-color: transparent;`);
    }
  });

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

//Listening for multiple select
$(".multipleSelect").fastselect({
  placeholder: "Tell us where you get your news",
});
var options = "";
[
  "The Daily Caller",
  "USA TODAY",
  "HuffPost",
  "Wall Street Journal (News)",
  "New York Post (News)",
  "New York Times (News)",
  "CNN (Online News)",
  "Wall Street Journal (Opinion)",
  "The Hill",
  "Vox",
  "Time Magazine",
  "Breitbart News",
  "CBS News (Online)",
  "BBC News",
  "NBC News (Online)",
  "Washington Examiner",
  "Vice",
  "Fox News (Online News)",
  "The Guardian",
  "NPR (Online News)",
  "Politico",
  "Newsweek",
  "ABC News (Online)",
  "CNN (Opinion)",
  "New York Post (Opinion)",
  "NPR (Opinion)",
  "Washington Post",
  "BuzzFeed News",
  "New York Times (Opinion)",
  "MSNBC",
].forEach((element) => {
  options +=
    `<option value=${element.split(" ").join("")}>` + element + `</option>`;
});
document.getElementById("news_select").innerHTML = options;

//Listen for submitting your news sources
document.querySelector(".submit_media").addEventListener("click", function () {
  var final_viz =
    document.getElementById("intro").scrollHeight +
    document.getElementById("demographics-scrolly").scrollHeight +
    document.getElementById("media-scrolly").scrollHeight +
    document.getElementById("user-input").scrollHeight;
  console.log("height", final_viz);
  window.scrollTo({ top: final_viz, behavior: "smooth" });
  sources_list = [];
  document.querySelectorAll(".fstChoiceItem").forEach(function (item) {
    sources_list.push(item.getAttribute("data-text"));
  });
  console.log(sources_list);
});

//Listen for hovering over bias filters
[
  ...document.querySelector("#media_filter").querySelectorAll(".container2"),
].forEach(function (item) {
  item.addEventListener("mouseover", function () {
    label = item.querySelector("mark");
    color = biasColors[label.getAttribute("value")];
    label.setAttribute("style", `background-color: ${color};`);
  });
  item.addEventListener("mouseout", function () {
    if (document.getElementById(label.getAttribute("value")).checked == false) {
      label.setAttribute("style", `background-color: transparent`);
    }
  });
});

var ethnicity;
var gender;
var age;
var education;
var metro;
var region;

// function updatePersonSources() {
//     console.log('update', document.getElementById("ethnicity-option").selectedIndex)
//     ethnicity = document.getElementById("ethnicity").options[document.getElementById("ethnicity").selectedIndex].value
//     console.log(ethnicity)
//     gender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value
//     age = document.getElementById("age").options[document.getElementById("age").selectedIndex].value
//     education = document.getElementById("education").options[ document.getElementById("education").selectedIndex].value
//     metro = document.getElementById("metro").options[document.getElementById("metro").selectedIndex].value
//     region = document.getElementById("region").options[document.getElementById("region").selectedIndex].value

// };

// convert source from people to allsides
function convertSources(sources) {
  newSources = [];
  for (i in sources) {
    source = sources[i];
    if (source in sourcesMap) {
      for (i in sourcesMap[source]) {
        s = sourcesMap[source][i];
        newSources.push(s);
      }
    }
  }
  return newSources;
}

// filters data to match the person card news sources
// TODO make it so that it sorts by similarity to user
function sortData(data, sources) {
  newData = [];
  sources = convertSources(sources);

  // filter to match person
  for (i in data) {
    news = data[i];
    for (j in sources) {
      source = sources[j];
      if (news.Source == source) {
        newData.push(news);
      }
    }
  }
  // userSimilarData = []
  // restOfData = []

  // for (i in newData) {
  //     d = newData[i]
  //     if (options.contains(d.Source)) {
  //         userSimilarData.push(d)
  //     } else {
  //         restOfData.push(d)
  //     }
  // }
  // console.log('okay')
  // console.log('concat', userSimilarData.concat(restOfData))
  return newData;
}

// RENDER
function render() {
  d3.csv("./data/people.csv").then(function (data) {
    sourceData = data;

    var person = {
      age: "65+",
      region: "Northeast",
      metro: "Metropolitan",
      sex: "Female",
      education: "Some College",
      race: "White",
    };
    //   var person = {
    //     age: age,
    //     region: region,
    //     metro: metro,
    //     sex: gender,
    //     education: education,
    //     race: ethnicity,
    //   };
    console.log(person.age);
    console.log("sourcess", sourceData);

    var result = sourceData.filter((d) => {
      return (
        d.F_AGECAT == person.age &&
        d.F_CREGION == person.region &&
        d.F_SEX == person.sex &&
        d.F_EDUCCAT == person.education &&
        d.F_RACECMB == person.race &&
        d.F_METRO == person.metro
      );
    });
    //   var randomPerson = sourceData[Math.floor(Math.random() * sourceData.length)];
    console.log("sourcessss", result);
    var randomPerson = result[5];
    console.log(randomPerson);
    sources = [];
    for (const property in randomPerson) {
      if (randomPerson[property] == "Yes") {
        sources.push(property);
      }
    }
    console.log(sources);
    render1();
  });
}

function render1() {
  // updatePersonSources()

  d3.csv("./data/final_allsides.csv").then(function (data) {
    svg.selectAll("g").remove();
    highlightedData = highlighted(data);
    updateFilter();
    // sortedData = data.filter((d) => sources.forEach(source => {if (d.Source.includes(source)) return true}))
    sortedData = sortData(data, sources);
    console.log("sources", sources);

    var g = svg
      .selectAll("g")
      .data(sortedData)
      .enter()
      .append("g")
      .attr(
        "transform",
        "translate(" + final_margin.left + "," + final_margin.top + ")"
      );

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
        return d.Source.toUpperCase();
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
        `<div class='tooltip-source'>${d.Source.toUpperCase()} </div>
        <div class='tooltip-header'><mark style='background-color:${
          biasColors[d.Bias]
        }; opacity:.8'>${d.Headline}</mark></div>
      <div class='tooltip-header2'>Headlines from other sources:</div>
      <div class='tooltip-sources'><mark style='background-color:${
        biasColors[d["Left Bias"]]
      }'>${d["Left Headline"]} </mark></div>
      <div class='tooltip-sources'><mark style='background-color:${
        biasColors[d["Center Bias"]]
      }'>${d["Center Headline"]}</mark></div>
      <div class='tooltip-sources'> <mark style='background-color:${
        biasColors[d["Right Bias"]]
      }'>${d["Right Headline"]}</mark></div>
      <div class='tooltip-more'>Click to read more</div>`
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
    <h1 id="modal_name">Recommended Reads for the Same Topic:</h1>  
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
