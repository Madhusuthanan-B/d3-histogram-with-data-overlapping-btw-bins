const overlappingData = [
  {
      "value": 0.09490740740740741,
      "lowerLimit": 33,
      "upperLimit": 36
  },
  {
      "value": 0.07407407407407407,
      "lowerLimit": 30,
      "upperLimit": 33
  },
  {
      "value": 0.09027777777777778,
      "lowerLimit": 27,
      "upperLimit": 30
  },
  {
      "value": 0.04398148148148148,
      "lowerLimit": 24,
      "upperLimit": 27
  },
  {
      "value": 0.011574074074074073,
      "lowerLimit": 21,
      "upperLimit": 24
  },
  {
      "value": 0.006944444444444444,
      "lowerLimit": 18,
      "upperLimit": 21
  },
  {
      "value": 0.009259259259259259,
      "lowerLimit": 15,
      "upperLimit": 18
  },
  {
      "value": 0.0023148148148148147,
      "lowerLimit": 12,
      "upperLimit": 15
  }
];

const normalData = [
  {
      "value": 0.013888888888888888,
      "lowerLimit": 8,
      "upperLimit": 10
  },
  {
      "value": 0.07291666666666667,
      "lowerLimit": 20,
      "upperLimit": 22
  },
  {
      "value": 0.013888888888888888,
      "lowerLimit": 10,
      "upperLimit": 12
  },
  {
      "value": 0.017361111111111112,
      "lowerLimit": 12,
      "upperLimit": 14
  },
  {
      "value": 0.08680555555555555,
      "lowerLimit": 14,
      "upperLimit": 16
  },
  {
      "value": 0.1423611111111111,
      "lowerLimit": 16,
      "upperLimit": 18
  },
  {
      "value": 0.1527777777777778,
      "lowerLimit": 18,
      "upperLimit": 20
  }
];
const data = overlappingData;

const margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

    const limitGap = data[0].upperLimit - data[0].lowerLimit;

    const xMin = d3.min(data, (d) => d.lowerLimit) - limitGap;
    const xMax = d3.max(data, (d) => d.upperLimit) + limitGap;
    const noOfTicks = data.length + 2;

    // Define xScale
    const xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, width]);

    // Defne yScale
    const yScale = d3.scaleLinear()
        .range([height, 0]);
    yScale.domain([0, d3.max(data, function (d) { return d.value; })]);


    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
    
    svg.append("g")
        .call(d3.axisLeft(yScale));


    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function (d) { return d.value; })
        .domain(xScale.domain())
        .thresholds(xScale.ticks(noOfTicks)); // Number of bins = number of ticks

    // And apply this function to data to get the bins
    const bins = histogram(data);

    console.log("bins", bins);

    const chartGroup = svg.append("g")
        .attr("class", "histogram");

    chartGroup.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => xScale(d.lowerLimit) + 1)
        .attr("y", (d) => yScale(d.value))
        .attr("height", (d) => yScale(0) - yScale(d.value))
        .attr("fill", "#69b3a2")
        .attr("width", (d) => Math.max(0, xScale(d.upperLimit) - xScale(d.lowerLimit) - 1));