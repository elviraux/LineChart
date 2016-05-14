d3.csv("js/data.csv", function(error, data){
    // create an empty object that nv is expecting
    var dataset = []
    var parseDate = d3.time.format("%d-%b-%y").parse;

    // populate the empty object with your data
    data.forEach(function (d,i){
        d.value = +d.value
        dataset.push({x: parseDate(d.date), y: d.value})
    })

    var exampleData = [{
            key: "totals",
            values: dataset
        }]

    nv.addGraph(function() {
      var chart = nv.models.lineChart()
                    .xScale(d3.time.scale())
                    .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .options({
                        duration: 500
                    })  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis

        // Set the ranges

        chart.xAxis     //Chart x-axis settings
          .axisLabel('Time (ms)')
          .tickFormat(function (d) {
            return d3.time.format("%d/%m")(new Date(d))
        });

        chart.yAxis     //Chart y-axis settings
          .axisLabel('CPU')
          .tickFormat(d3.format('.02f'));


        d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
          .datum(exampleData)         //Populate the <svg> element with chart data...
          .call(chart);          //Finally, render the chart!

        //Update the chart when window resizes.
        nv.utils.windowResize(function() { chart.update() });
        return chart;
    });


 });

// var dataset = []
// var parseDate = d3.time.format("%d-%b-%y").parse;

// // populate the empty object with your data
// data.forEach(function (d,i){
//     d.value = +d.value
//     dataset.push({x: parseDate(d.date), y: d.value})
// })

// var exampleData = [{
//     key: "totals",
//     values: dataset
// }]

// nv.addGraph(function() {
//   var chart = nv.models.lineChart()
//     .useInteractiveGuideline(true)
//     ;

//   chart.xAxis
//     .axisLabel('Time (ms)')
//     .tickFormat(d3.format(',r'));

//   chart.yAxis
//     .axisLabel('Voltage (v)')
//     .tickFormat(d3.format('.02f'));

//   d3.select('#chart svg')
//     .datum(exampleData)
//     .transition().duration(500)
//     .call(chart);

//   nv.utils.windowResize(chart.update);

//   return chart;
// });

var data = function() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}


