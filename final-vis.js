const final_margin = { top: 0, right: 30, bottom: 50, left: 50 },
  newsWidth = 70,
  newsHeight = 90,
  maxLineNumber = 7,
  bylineMarginTop = 40,
  headerContainerWidth = 60,
  headerContainerMargin = { top: 1, left: .8 },
  maxNumNews = 63,
  topicCap = 12;
(strokeWidth = 5),
  (numRow = 9),
  (numFilters = 10),
  //Square and Highlight Colors
  (squareColor = "rgba(198, 198, 198, .5)"),
  (curSquareColor = squareColor),
  (bridgeColor = "#c5ac1c"),
  (highlightColor = "grey");

var final_width = window.innerWidth*.6 - final_margin.left - final_margin.right,
  final_height = window.innerHeight*1.3  - final_margin.top - final_margin.bottom,
  row = d3.scaleLinear().domain([0, numRow]).range([0, window.innerWidth*.55]),
  col = d3.scaleLinear().domain([0, numRow]).range([0, window.innerHeight*1.1]);

sourcesMap = {
    "ABC News": ["ABC News (Online)"],
    "BBC": ["BBC News"],
    "BrietBart": ["Breitbart News"],
    "Business Insider": ["Insider"],
    "Buzzfeed": ["BuzzFeed News"],
    "CBS News": ["CBS News (Online)"],
    "CNN": ["CNN (Online News)", "CNN (Opinion)"],
    "Daily Caller": ["The Daily Caller"],
    "Fox News": ["Fox News (Online News)"],
    "HuffPost": ["HuffPost"],
    "MSNBC": ["MSNBC"],
    "NBC News": ["NBC News (Online)"],
    "NPR": ["NPR (Opinion)", "NPR (Online News)"],
    "New York Post": ["New York Post"],
    "Newsweek": ["Newsweek"],
    "PBS": ["PBS NewsHour"],
    "Politico": ["Politico"],
    "Rush Limbaugh Show (radio)": ["Rush Limbaugh"],
    "Sean Hannity Show (radio)": ["Sean Hannity"],
    "The Guardian": ["The Guardian"],
    "The Hill": ["The Hill"],
    "The New York Times": ["New York Times (Opinion)", "New York Times (News)"],
    "The Wall Street Journal": ["Wall Street Journal (News)","Wall Street Journal (Opinion)"],
    "Time": ["Time Magazine"],
    "USA TODAY": ["USA TODAY"],
    "Univision": ["Univision"],
    "Vice": ["Vice"],
    "Vox": ["Vox"],
    "Washington Examiner": ["Washington Examiner"],
    "Washington Post": ["Washington Post"],
};

var sourceData;
var sources;
var userInputSources = []; // TODO maybe add a default
var similarityHighlighted = {}; // map of newspapers that should be highlighted

// add people to this map as they are chosen to remember the random selections
var peopleMap = {};
var personIndex = 0;
var result;

var biasColors = {
  Left: "#2E65A0",
  "Lean Left": "#9EC8EB",
  Center: "#9766A0",
  "Lean Right": "#CA9A98",
  Right: "#CB2127",
};

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

var finalLabel = d3.select("#final_label").text("")

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// check for resize of window
window.addEventListener('resize', function (e) {
    console.log('resize')
    final_width = window.innerWidth*.6 - final_margin.left - final_margin.right,
    final_height = window.innerHeight*1.3  - final_margin.top - final_margin.bottom;
    row = d3.scaleLinear().domain([0, numRow]).range([0, window.innerWidth*.55]);
    col = d3.scaleLinear().domain([0, numRow]).range([0, window.innerHeight*1.1]);
    svg
    .attr("width", final_width + final_margin.left + final_margin.right)
    .attr("height", final_height + margin.top + margin.bottom);
    render()
});

function updateFilter() {
  biasFilter = ["Left", "Lean Left", "Center", "Lean Right", "Right"];
  topicFilter = ["covid", "climate change", "blm", "guns", "economy"];

//   console.log(document.getElementById("Left").checked);

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

function highlightByFilter(data) {
  filtered_data = data.filter((d) => fitsFilter(d));
  rest_of_data = data.filter((d) => !filtered_data.includes(d));

  const all_data = {};
  var i = 0;
  for (key in filtered_data) {
    if (filtered_data.hasOwnProperty(key)) {
      // all_data[i] = filtered_data[key];
      all_data[filtered_data[key].Index] = biasColors[filtered_data[key].Bias];
      i++;
    }
  }
  for (key in rest_of_data) {
    if (rest_of_data.hasOwnProperty(key)) {
      // all_data[i] = rest_of_data[key];
      all_data[rest_of_data[key].Index] = squareColor;
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
    render(); // render if there's an update in person card
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
    "ABC News (Online)",
    "BBC News",
    "Breitbart News",
    "BuzzFeed News",
    "CBS News (Online)",
    "CNN (Online News)", 
    "CNN (Opinion)",
    "Fox News (Online News)",
    "HuffPost",
    "Insider",
    "MSNBC",
    "NBC News (Online)",
    "NPR (Online News)",
    "NPR (Opinion)", 
    "New York Post",
    "New York Times (News)",
    "New York Times (Opinion)", 
    "Newsweek",
    "PBS NewsHour",
    "Politico",
    "Rush Limbaugh",
    "Sean Hannity",
    "The Daily Caller",
    "The Guardian",
    "The Hill",
    "Time Magazine",
    "USA TODAY",
    "Univision",
    "Vice",
    "Vox",
    "Wall Street Journal (News)",
    "Wall Street Journal (Opinion)",
    "Washington Examiner",
    "Washington Post",

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
//   console.log("height", final_viz);
  window.scrollTo({ top: final_viz, behavior: "smooth" });
  //   sources_list = [];
  document.querySelectorAll(".fstChoiceItem").forEach(function (item) {
    userInputSources.push(item.getAttribute("data-text"));
  });
//   console.log("user", userInputSources);
  render();
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

//Listen for change person
document.querySelector("#changePerson").addEventListener("click", function () {
    changePerson();
  });



var ethnicity = "White";
var gender = "Female";
var age = "18-29";
var education = "H.S. graduate or less";
var metro = "Metropolitan";
var region = "Northeast";

function updatePersonSources() {
  dEthnicity = document.getElementById("ethnicity");
  for (const option of dEthnicity.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      ethnicity = option.dataset.value;
    }
  }
  dGender = document.getElementById("gender");
  for (const option of dGender.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      gender = option.dataset.value;
    }
  }
  dAge = document.getElementById("age");
  for (const option of dAge.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      age = option.dataset.value;
    }
  }
  dEducation = document.getElementById("education");
  for (const option of dEducation.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      education = option.dataset.value;
    }
  }
  dMetro = document.getElementById("metro");
  for (const option of dMetro.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      metro = option.dataset.value;
    }
  }
  dRegion = document.getElementById("region");
  for (const option of dRegion.querySelectorAll(".custom-option")) {
    if (option.classList.contains("selected")) {
      region = option.dataset.value;
    }
  }
}

// increment the personIndex to display the next person
function changePerson() {
    // console.log('length', result.length)
    if (personIndex>=result.length-1) {
        personIndex = 0;
    } else {
        personIndex += 1;
    }
    // console.log('personIndex', personIndex)
    render();
}

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

// used to make sure the same articles are chosen for the same person
var randomNumbersMap = {}

// filters data to match the person card news sources
// and then sorts by similarity to user
function sortData(data, sources) {
  newData = [];
  sources = convertSources(sources);
  topicMap = {
    "covid": [],
    "climate change": [],
    "blm": [],
    "guns": [],
    "economy": []
    }       

  // filter to match person
  for (i in data) {
    news = data[i];
    for (j in sources) {
      source = sources[j];
      if (news.Source == source) {
        newData.push(news);
        var topic = news.Topic
        if (topicMap[topic].length < 12) {
            topicMap[topic].push(news)
            console.log('added')
        }
      }
    }
  }

  if (newData.length>maxNumNews) {
    var cappedData = [];

    for (topic in topicMap) {
        console.log('topic', topic)
        data = topicMap[topic]
        console.log('data', data)
        cappedData = cappedData.concat(data)
    }
    console.log('capped', cappedData)
  } else {
      var cappedData = newData;
  }

  console.log('cappedData', cappedData)
  userSimilarData = [];
  restOfData = [];

//   console.log(newData);

  for (i in cappedData) {
    d = cappedData[i];
    if (userInputSources.includes(d.Source)) {
      userSimilarData.push(d);
      similarityHighlighted[d.Index] = bridgeColor;
    } else {
      restOfData.push(d);
      similarityHighlighted[d.Index] = squareColor;
    }
  }

  return userSimilarData.concat(restOfData);
}

function randomNums(length) {
    var nums = [];
    while(nums.length < topicCap){
        var r = Math.floor(Math.random() * length);
        if(nums.indexOf(r) === -1) nums.push(r);
    }
    return nums
}

// if too many articles, cap within each topic
function capData(data) {
    // map of data keyed by topic
    topicMap = {
        "covid": [],
        "climate change": [],
        "blm": [],
        "guns": [],
        "economy": []
    }
    for (i in data) {
        news = data[i]
        if (topicMap.hasOwnProperty(news.Topic)) {
            topicMap[news.Topic].push(news)
        }
    }

    cappedData = [];
    i = 0;

    for (topic in topicMap) {
        data = topicMap[topic]
        length = data.length
        if (length in randomNumbersMap) {
            var randomNumbers = randomNumbersMap[length]
        } else {
            var randomNumbers = randomNums(data.length)
            randomNumbersMap[length] = randomNumbers
        }
        // randomly select from data of each topic
        randomNumbers.forEach((element) => {
            cappedData.push(data[element])
        })
    }
    console.log('randomNumbersMap', randomNumbersMap)
    // console.log('cappedData', cappedData)
    return cappedData

}

// RENDER
function render() {
  d3.csv("./data/people.csv").then(function (data) {
    sourceData = data;
    updatePersonSources();

      var person = {
        age: age,
        region: region,
        metro: metro,
        sex: gender,
        education: education,
        race: ethnicity,
      };
    // console.log(person.age);
    // console.log("sourcess", sourceData);

    result = sourceData.filter((d) => {
      return (
        d.F_AGECAT == person.age &&
        d.F_CREGION == person.region &&
        d.F_SEX == person.sex &&
        d.F_EDUCCAT == person.education &&
        d.F_RACECMB == person.race &&
        d.F_METRO == person.metro
      );
    });

    // determine random person
    var currentDemographics = ethnicity+gender+age+education+metro+region
    // console.log('currentDemographics', currentDemographics)
    var randomPerson = result[personIndex]
    // if (currentDemographics in peopleMap) {
    //     console.log('in peopleMap')
    //     var randomPerson = peopleMap[currentDemographics]
    // } else {
    //     // var randomPerson = result[Math.floor(Math.random() * result.length)];
    //     console.log('min', Math.min(0,1))
    //     var randomPerson = result[personIndex]
    //     peopleMap[currentDemographics] = randomPerson
    // }

      
    // console.log("sourcessss", result);
    // var randomPerson = result[1];
    // console.log(randomPerson);

    sources = [];
    for (const property in randomPerson) {
      if (randomPerson[property] == "Yes") {
        sources.push(property);
      }
    }
    // console.log(sources);
    if (result.length==0) {
        finalLabel.text("We do not have data on this person :( Please select a different combination of demographics to continue exploring!")
    } else if (sources.length==0) {
        finalLabel.text("This person does not read the news sources we have or does not read the news! Click the Next Person button to see if any others of this demographic do!")
    } else {
        finalLabel.text("")
    }
    renderUnitVis();
  });
}

function renderUnitVis() {
  // updatePersonSources()

  d3.csv("./data/final_allsides.csv").then(function (data) {
    svg.selectAll("g").remove();
    // highlightedData = highlighted(data);
    updateFilter();
    // sortedData = data.filter((d) => sources.forEach(source => {if (d.Source.includes(source)) return true}))
    sortedData = sortData(data, sources);
    // console.log("sorted", sortedData);
    // if (sortedData.length>maxNumNews) {
    //     var cappedData = capData(sortedData);
    // } else {
    //     var cappedData = sortedData;
    // }
    highlightedDataMap = highlightByFilter(sortedData)

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
        return col(n);
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
        return col(n);
      })
      .attr("dy", "1em")
      .style("color", "black")
      .text((d) => {
        // console.log(d.Headline);
        return d.Source.toUpperCase();
      })
      .attr("font-size", "8px")
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
        return col(n);
      })
      .attr("rx", 1)
      .attr("ry", 1)
      .attr("width", newsWidth)
      .attr("height", newsHeight)
      .attr("stroke-width", strokeWidth)
      .attr("stroke", (d) => {
        return similarityHighlighted[d.Index];
      })
      //   .attr("fill", (d) => {return biasColors[d.Bias]})
      .attr("fill", (d) => {
        return highlightedDataMap[d.Index];
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
