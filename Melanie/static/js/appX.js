//function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // ******** Will need this to update ************
  // // force data to update when menu is changed    
  // var menu = d3.select("#menu select")
  //     .on("change", change);

  // Define SVG area dimensions
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight/1.8;

  // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  // Select visualization 1, append SVG area to it, and set its dimensions
  var svg = d3.select("#visualization_1")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append a group area, then set its margins
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Configure a parseTime function which will return a new Date object from a string
  var parseDate = d3.timeParse("%m/%d/%Y");
  var fredParseDate = d3.timeParse("%m/%d/%Y");

  // // Set initial param to be updated by reference to menus
   var initialTicker = '8'

  //Create Title 
    // Add Chart title
  svg.append("text")
    .attr("x", (svgWidth / 2))             
    .attr("y", (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Selected Ticker vs. Fred Indices");

  //Create X axis label   
  svg.append("text")
    .attr("x", svgWidth / 2 )
    .attr("y",  svgHeight - 18)
    .style("text-anchor", "middle")
    .text("Date");

  //Create Y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (svgHeight/ 2))
    .attr("y", svgWidth / 90)
    //.attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Ratio of Value to Max Value");  


  // Load data from tickerData.csv
  // ************************THIS LOADS THE TICKER DATA****************************
  d3.json("/Tickerdata").then(function(tickerData) {
    
    
    // Create filter to target selected ticker
    tickerData =  tickerData.filter(function(ticker) {
      return ticker.number == initialTicker;
    });
      

    // Create filter to remove #N/A
    tickerData = tickerData.filter(function(ticker) {
      return ticker.Value_to_Max_Value_Ratio != "#N/A"
    })
    
    // Format the date and cast the respective values as needed
    tickerData.forEach(function(data) {
      data.date = parseDate(data.date);
      data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
      //data.category_Number = data.category_Number;
      data.number = +data.number;
    });

    // Configure a time scale with a range between 0 and the chartWidth
    // Set the domain for the xTimeScale function
    // d3.extent returns the an array containing the min and max values for the property specified
    var xTimeScale = d3.scaleTime()
      .range([0, chartWidth])
      .domain(d3.extent(tickerData, data => data.date));

    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(tickerData, data => data.Value_to_Max_Value_Ratio)]);

    var yAxisScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, 1])

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yAxisScale);

    // Configure a drawLine function which will use our scales to plot the line's points
    var drawLine = d3
      .line()
      .x(data => xTimeScale(data.date))
      .y(data => yLinearScale(data.Value_to_Max_Value_Ratio));

    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
      // The drawLine function returns the instructions for creating the line for milesData
      .attr("d", drawLine(tickerData))
      //.attr("data-legend",function(tickerData) { return tickerData.category_Number})
      .classed("tickline", true);

    // Append an SVG group element to the SVG area, create the left axis inside of it
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis);

    // // Create the tooltip in chartGroup.
    // chartGroup.call(toolTip);

    // // Create "mouseover" event listener to display tooltip
    // chartGroup.on("mouseover", function(d) {
    //   toolTip.show(d, this);
    // })
    // // Create "mouseout" event listener to hide tooltip
    // .on("mouseout", function(d) {
    //   toolTip.hide(d);
    // });

    var legend_keys = ["Selected Ticker", "Fred 1", "Fred 2", "Fred 3", "Fred 4"]
    var color_key = ["blue", "orange", "green", "purple", "black"]

    var lineLegend = chartGroup.selectAll(".lineLegend").data(legend_keys)
      .enter().append("g")
      .attr("class","lineLegend")
      .attr("transform", function (d,i) {
        return "translate(" + chartWidth / 1.15 + "," + (chartHeight - 15 - (i*20)) +")";
      });

    lineLegend.append("text").text(function (d) {return d;})
      .attr("transform", "translate(15,9)"); //align texts with boxes

    lineLegend.append("rect")
      .attr("fill", function (d, i) {return color_key[i]; })
      .attr("width", 10).attr("height", 10);

  }).catch(function(error) {
    console.log(error);
  });

  function createChartLine(idx, lineCssClass){
		d3.json('/FREDdata/' + idx).then(function(fredData) {

		// Create filter to remove #N/A
		fredData = fredData.filter(function(fred) {
		  return fred.max_value != "#N/A"
		});
		
		// Format the date and cast the respective values as needed
		fredData.forEach(function(data) {
		  data.date = fredParseDate(data.date);
		  data.max_value = +data.max_value;
		});

		// Configure a time scale with a range between 0 and the chartWidth
		// Set the domain for the xTimeScale function
		// d3.extent returns the an array containing the min and max values for the property specified
		let xTimeScale = d3.scaleTime().range([0, chartWidth]).domain(d3.extent(fredData, data => data.date));

		// Configure a linear scale with a range between the chartHeight and 0
		// Set the domain for the xLinearScale function
		let yLinearScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, d3.max(fredData, data => data.max_value)]);

		// Configure a drawLine function which will use our scales to plot the line's points
		let drawLine = d3.line().x(data => xTimeScale(data.date)).y(data => yLinearScale(data.max_value)).curve(d3.curveMonotoneX);

		// Append an SVG path and plot its points using the line function
		  // The drawLine function returns the instructions for creating the line for milesData
		chartGroup.append("path").attr("d", drawLine(fredData)).classed(lineCssClass, true);

	  }).catch(function(error) {
		console.log(error);
	  });
  }

	// All 4 FRED trends into graph
	createChartLine(1, 'fred1line');
	createChartLine(2, 'fred2line');
	createChartLine(3, 'fred3line');
	createChartLine(4, 'fred4line');

  // COMMENT STARTING HERE FOR THE VIZ 3 ERROR ///////////////////////////////////////////////////////////////////////

  var svg3 = d3.select("#visualization_3")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup3 = svg3.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //NOTE NEED TO CHANGE FEEDING IN BY CSV FOR NOW WHILE WAITING FOR SQLITE
  d3.json("/Tickerdata").then((function(financeData) {
    //created to read the date 
    var parseDate = d3.timeParse("%m/%d/%Y"); 

    // Set initial param to be updated by reference to menus
    // Create filter to target selected ticker
    financeData = financeData.filter(function(data) {
      return data.number == initialTicker;
    });

    

  //unpacked all data that was relevant. note that the category number had a space in the header so it is slightly different
    financeData.forEach(function(data) {
      data.number = +data.number;
      data.date = parseDate(data.date);
      data.value = +data.value;
      data.volume = +data.volume;
    });

    

    //x scale from min to max date
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(financeData, d => d.date), d3.max(financeData, d => d.date)])
      .range([0, chartWidth]);
    //y scale a bit higher than max value to account for large bubbles at the top of the chart going out of frame
    var yLinearScale = d3.scaleLinear()
      .domain([-50, d3.max(financeData, d => d.value)*1.1])
      .range([chartHeight, 0]);
    
    //generating axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    //change the format to date 
    chartGroup3.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis.tickFormat(d3.timeFormat("%m/%d/%Y")));

    chartGroup3.append("g")
      .call(leftAxis);

      // console.log(financeData)

    //right now is just 1 ticker. r is to make sure the graph is readable
    var financialGroup = chartGroup3.selectAll("circle")
    .data(financeData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.date))
    .attr("cy", d => yLinearScale(d.value))
    .attr("r", d => (d.volume)/6000000)
    .attr("fill", "blue")
    .attr("opacity", ".1");

    chartGroup3.append("text")
      .attr(`transform`, `rotate(-90)`)
      .attr("y", 0 - margin.left + 5)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Value of Ticker ($)");

    chartGroup3.append("text")
      .attr(`transform`, `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Date");

    chartGroup3.append("text")
      .attr("x", (svgWidth / 2))             
      .attr("y", (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Selected Ticker's Value and Volume Over Time");

    var legend_keys = ["Selected Ticker's Volume"]
    var color_key = ["blue"]

    var lineLegend = chartGroup3.selectAll(".lineLegend").data(legend_keys)
      .enter().append("g")
      .attr("class","lineLegend")
      .attr("transform", function (d,i) {
        return "translate(" + chartWidth / 1.3 + "," + (chartHeight - 20 - (i*20)) +")";
      });

    lineLegend.append("text").text(function (d) {return d;})
      .attr("transform", "translate(15,9)"); //align texts with boxes

    lineLegend.append("circle")
      .attr("fill", function (d, i) {return color_key[i]; })
      .attr("r", 9);

   }))//.catch(function(error) {
   //   console.log(error);
   // })


  // COMMENT OUT TO HERE FOR THE VIZ 3 ERROR ///////////////////////////////////////////////////////////////////////

//)};

  // When the browser loads, makeResponsive() is called.
//makeResponsive();

// When the browser window is resized, makeResponsive() is called.
//d3.select(window).on("resize", makeResponsive);


///// ADDING VISUALIZATION #2 ********************************************************************************
///// Martin everything below this line is the new code  ********************************************************************************



var svg2 = d3.select("#visualization_2")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup2 = svg2.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



d3.json('/Mchanges').then(function(viz2Data) {
 
 // Create bins to hold desired data
  var fred = [];
  var mchange = [];

  // Add desired mchange data
  viz2Data.forEach((data) => {
    Object.entries(data).forEach(([key, value]) => {

      if (key === 'spy_percentage_diff') {
        mchange.push(value);
      }

    })
    
  });

  d3.json('/FREDdata/' + '1').then(function(fredData) {
    //console.log(viz2Data)
    var parseDate = d3.timeParse("%m/%d/%Y"); 
    var spy_percentage_diff = 'spy_percentage_diff';
  

  //  Set initial param to be updated by reference to menu
    var initialFred = '2';

    
    //console.log(viz2Data)
  // //unpacked all data that was relevant. note that the category number had a space in the header so it is slightly different
    fredData.forEach(function(data) {
      data.Perc_Cng = +data.Perc_Cng;
      fred.push(data.Perc_Cng);
    });
    // console.log(fredData)
    // console.log(mchange)
    var data = [fredData, mchange]
    
   //x scale from min to max date
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(fredData, d => d.Perc_Cng), d3.max(fredData, d => d.Perc_Cng)])
    .range([0, chartWidth]);
 //y scale a bit higher than max value to account for large bubbles at the top of the chart going out of frame
  var yLinearScale = d3.scaleLinear()
   .domain([d3.min(mchange), d3.max(mchange)])
   .range([chartHeight, 0]);


  // Combine the data
    combined = []
    for (var i = 0; i < 1000; i++) {
      combined[i] = {
        "mchange": mchange[i],
        "fred": fred[i],
            }
    }

//generating axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
//change the format to date 

  chartGroup2.append("g")
    .call(leftAxis)
    .attr(`transform`, `translate(${chartWidth / 2})`);

  chartGroup2.append("g")
    .call(bottomAxis)
    .attr(`transform`, `translate(0, ${svgHeight / 2} )`);

  //right now is just 1 ticker. r is to make sure the graph is readable
  var chart2Cirlces = chartGroup2.selectAll("circle")
  .data(combined)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.mchange))
  .attr("cy", d => yLinearScale(d.fred))
  .attr("r", 20)
  .attr("fill", "blue");


  })
  
})

