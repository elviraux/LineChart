//TODO: 1) Combine logs and metrics in one graph Y(metric), X(date); metric.date === logs.date { logs }
//      2) Parse metr

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

// Metric data
var data = [
  {'date': 'May 13 14:38:30',
    'close': '14',
    'logs': ['Using this method, analysts engage', 'back-and-forth dialogue']
  },
  {'date': 'May 13 14:38:35',
    'close': '30',
   'logs': ['fully automatic predictions']
  },
  {'date': 'May 13 14:39:00',
    'close': '34',
   'logs': ['we perform a 2,000 user', 'VASs typically consist']
  },
  {'date': 'May 13 14:39:01',
    'close': '15',
   'logs': ['svg.append("circle")', 'and you want many circles']
  },
  {'date': 'May 13 14:39:06',
    'close': '10',
    'logs': ['d3.ascending - compare two values for sorting.']
  },
  {'date': 'May 13 14:39:10',
    'close': '5',
    'logs': ['We can also specify where the labels should appear relative to the axis itself.']
  },
  {'date': 'May 13 14:39:17',
    'close': '20',
    'logs': ['we can be more concise and', 'we perform a 2,000', 'string all this together' ]
  },
  {'date': 'May 13 14:39:25',
    'close': '30',
    'logs': ['Of course, we can be more concise and string all this together into one line:']
  },
  {'date': 'May 13 14:39:27',
    'close': '10',
    'logs': ['into our SVG, we must call the xAxis function']
  }
  
]; 

// Parse the date / time
var parseDate = d3.time.format("%B %d %H:%M:%S").parse;
data.forEach(function(d) {
  d.date = parseDate(d.date);
  d.close = +d.close;
});

// Define 'div' for tooltips
var tooltip = d3.select("body")
    .append("div")  // declare the tooltip div 
    .attr("class", "tooltip")
    .style("opacity", 0);


//var bisectDate = d3.bisector(function(d) { return d.date; }).left;
var formatTime = d3.time.format("%e %B %H:%M:%S");// Format tooltip date / time
// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(9);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var lineSvg = svg.append("g");

// var focus = svg.append("g") 
//     .style("display", "none");

// Scale the range of the data
x.domain(d3.extent(data, function(d) { console.log(d.date); return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.close; })]);

// Add the valueline path.
lineSvg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

// Add the X Axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the Y Axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// // append the circle at the intersection 
// focus.append("circle")
//     .attr("class", "y")
//     .style("fill", "none")
//     .style("stroke", "blue")
//     .attr("r", 4);

// focus.append("circle")
//     .attr("class", "mark")
//     .style("fill", "black")
//     .style("stroke", "black")
//     .attr("r", 4);
// Define datalog window
var f = true,
  selected = [],
  temp = '';

var datalog = d3.select("body")
    .append("div")
    .attr('class', 'datalog')

svg.selectAll("dot")              
    .data(data)
    .enter().append("circle")        
        .attr("r", 5)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.close); })
        .style("opacity", 0.3)
        .on("mouseover", function(d) {
           tooltip.transition()
                .duration(500)    
                .style("opacity", 0);
           tooltip.transition()
                .duration(200)    
                .style("opacity", .9);    
           tooltip.html('<div>' + formatTime(d.date) + "</div><div>" + d.close + "</div>") 
                .style("left", (d3.event.pageX) + "px")        
                .style("top", (d3.event.pageY - 35) + "px");})
        .on("click", function(d) {
          if(selected.indexOf(d) ===-1 ) {
            d3.select(this).style("opacity", "0.7");
            selected.push(d);
            temp = d;
            console.log(temp.logs);
            datalog.selectAll('p')
              .data(temp.logs).enter().insert("p").html(String);
              
            console.log("Added!");
          } else {
            d3.select(this).style("opacity", "0.2");
            selected.splice(selected.indexOf(d), 1);
            console.log("Removed!");
          }
          //console.log(selected);
        })



// append the rectangle to capture mouse
// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .style("fill", "none")
//     .style("pointer-events", "all")
//     .on("mouseover", function() {
//       focus.style("display", null); 
// })
//     .on("mouseout", function() { focus.style("display", "none"); })
//     .on("mousemove", mousemove)
//     .on("click", click)
    

// function mousemove() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//         i = bisectDate(data, x0, 1),
//         d0 = data[i - 1],
//         d1 = data[i],
//         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//     focus.select("circle.y")
//       .attr("transform", "translate (" + x(d.date) + "," +  y(d.close) + ")");
// }