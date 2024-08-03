import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const resp = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")

const result = await resp.json()

console.log( result, "data!!", result.data)

const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    // .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .domain([new Date("1945-01-01"), new Date("2015-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([240, 18065])
    .range([height - marginBottom, marginTop]);

const svg = d3.select("div").append("svg").attr("width", width).attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .attr("id", "x-axis")
    .attr("class", "tick")
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .attr("id", "y-axis")
    .attr("class", "tick")
    .call(d3.axisLeft(y));

// svg.selectAll("rect").data(result.data).enter().append("rect").attr("class", "bar").attr("data-date", d => d[0]).attr("data-gdp", d => d[1]).attr("x", (d, i) => d[2]).attr("y", d => d[1]).attr("width", "8px").attr("height", d => d[1] + "px").attr("fill", "red")

svg.selectAll("rect")
.data(result.data).enter().append("rect")
.attr("class", "bar").attr("data-date", d => d[0]).attr("data-gdp", d => d[1]).attr("x", (d, i) => i + marginLeft + 4).attr("y", d => d[1]).attr("width", "1px").attr("height", d => d[1] + "px")
.attr("fill", "green").append("title").text(d => d[0])

// // adding x-axis
// svg.append("g").attr("id", "x-axis")
// // svg.append("g").attr("id", "x-axis").call(d3.axisBottom(d3.scaleLinear([1945, 2015])))

// // adding y-axis
// svg.append("g").attr("id", "y-axis")


// const x = d3.scaleLinear([10, 100], ["red", "blue"]);
// x.ticks(); // [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
// console.log(x.ticks())

// const x = d3.scaleLinear([1945, 2015])

// Declare the x (horizontal position) scale.
// const x = d3.scaleUtc()
//     .domain([new Date("1945-01-01"), new Date("2015-01-01")])
//     .range([marginLeft, width - marginRight]);

// // Declare the y (vertical position) scale.
// const y = d3.scaleLinear()
//     .domain([0, 100])
//     .range([height - marginBottom, marginTop]);


// // adding x-axis
// svg.append("g").attr("id", "x-axis").call(d3.axisBottom(x)).attr("class", "tick");

// // adding y-axis
// svg.append("g").attr("id", "y-axis").call(d3.axisLeft(y)).attr("class", "tick")

// x-axis scale
// const xAxis = d3.axisBottom().scale(x)
// x.ticks()

// // adding x-axis
// svg.append("g").attr("id", "x-axis").call(d3.axisBottom(x))

// // adding y-axis
// svg.append("g").attr("id", "y-axis")