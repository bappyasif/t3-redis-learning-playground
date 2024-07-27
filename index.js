console.log("what what!!")

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 640;
const height = 400;

const svg = d3.select("div").append("svg").attr("width", width).attr("height", height);

// adding x-axis
svg.append("g").attr("id", "x-axis")
// svg.append("g").attr("id", "x-axis").call(d3.axisBottom(d3.scaleLinear([1945, 2015])))

// adding y-axis
svg.append("g").attr("id", "y-axis")


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