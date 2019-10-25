function makeResponsive() {

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
  var svgHeight = window.innerHeight;

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
  // var svg = d3.select("#visualization_1")
  //   .append("svg")
  //   .attr("width", svgWidth)
  //   .attr("height", svgHeight);

  // // Append a group area, then set its margins
  // var chartGroup = svg.append("g")
  //   .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // // Configure a parseTime function which will return a new Date object from a string
  // var parseDate = d3.timeParse("%m/%d/%y");

  // // Set initial param to be updated by reference to menus
   var initialTicker = '9'

  // //Create Title 
  //   // Add Chart title
  // svg.append("text")
  //   .attr("x", (svgWidth / 2))             
  //   .attr("y", (margin.top / 2))
  //   .attr("text-anchor", "middle")  
  //   .style("font-size", "16px") 
  //   .style("text-decoration", "underline")  
  //   .text("Selected Ticker vs. Fred Indices");

  // //Create X axis label   
  // svg.append("text")
  //   .attr("x", svgWidth / 2 )
  //   .attr("y",  svgHeight - 18)
  //   .style("text-anchor", "middle")
  //   .text("Date");

  // //Create Y axis label
  // svg.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("x", 0 - (svgHeight/ 2))
  //   .attr("y", svgWidth / 50)
  //   //.attr("dy", "1em")
  //   .style("text-anchor", "middle")
  //   .text("Ratio of Value to Max Value");  


  // // Load data from tickerData.csv
  // // ************************THIS LOADS THE TICKER DATA****************************
  // d3.json("/Tickerdata").then(function(tickerData) {

  //   // Create filter to target selected ticker
  //   tickerData =  tickerData.filter(function(ticker) {
  //     return ticker.number == initialTicker;
  //   });

  //   // Create filter to remove #N/A
  //   tickerData = tickerData.filter(function(ticker) {
  //     return ticker.Value_to_Max_Value_Ratio != "#N/A"
  //   })

  //   // Format the date and cast the respective values as needed
  //   tickerData.forEach(function(data) {
  //     data.Date = parseDate(data.date);
  //     data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
  //     //data.category_Number = data.category_Number;
  //     data.number = +data.number;
  //   });

  //   // Configure a time scale with a range between 0 and the chartWidth
  //   // Set the domain for the xTimeScale function
  //   // d3.extent returns the an array containing the min and max values for the property specified
  //   var xTimeScale = d3.scaleTime()
  //     .range([0, chartWidth])
  //     .domain(d3.extent(tickerData, data => data.Date));

  //   // Configure a linear scale with a range between the chartHeight and 0
  //   // Set the domain for the xLinearScale function
  //   var yLinearScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, d3.max(tickerData, data => data.Value_to_Max_Value_Ratio)]);

  //   var yAxisScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, 1])

  //   // Create two new functions passing the scales in as arguments
  //   // These will be used to create the chart's axes
  //   var bottomAxis = d3.axisBottom(xTimeScale);
  //   var leftAxis = d3.axisLeft(yAxisScale);

  //   // Configure a drawLine function which will use our scales to plot the line's points
  //   var drawLine = d3
  //     .line()
  //     .x(data => xTimeScale(data.Date))
  //     .y(data => yLinearScale(data.Value_to_Max_Value_Ratio));

  //   // Append an SVG path and plot its points using the line function
  //   chartGroup.append("path")
  //     // The drawLine function returns the instructions for creating the line for milesData
  //     .attr("d", drawLine(tickerData))
  //     //.attr("data-legend",function(tickerData) { return tickerData.category_Number})
  //     .classed("tickline", true);

  //   // Append an SVG group element to the SVG area, create the left axis inside of it
  //   chartGroup.append("g")
  //     .classed("axis", true)
  //     .call(leftAxis);

  //   // Append an SVG group element to the SVG area, create the bottom axis inside of it
  //   // Translate the bottom axis to the bottom of the page
  //   chartGroup.append("g")
  //     .classed("axis", true)
  //     .attr("transform", "translate(0, " + chartHeight + ")")
  //     .call(bottomAxis);

  //   // Create the tooltip in chartGroup.
  //   chartGroup.call(toolTip);

  //   // Create "mouseover" event listener to display tooltip
  //   chartGroup.on("mouseover", function(d) {
  //     toolTip.show(d, this);
  //   })
  //   // Create "mouseout" event listener to hide tooltip
  //   .on("mouseout", function(d) {
  //     toolTip.hide(d);
  //   });

  //   var legend_keys = ["Selected Ticker", "Fred 1", "Fred 2", "Fred 3", "Fred 4"]
  //   var color_key = ["blue", "orange", "green", "purple", "black"]

  //   var lineLegend = chartGroup.selectAll(".lineLegend").data(legend_keys)
  //     .enter().append("g")
  //     .attr("class","lineLegend")
  //     .attr("transform", function (d,i) {
  //       return "translate(" + chartWidth / 1.15 + "," + (chartHeight - 15 - (i*20)) +")";
  //     });

  //   lineLegend.append("text").text(function (d) {return d;})
  //     .attr("transform", "translate(15,9)"); //align texts with boxes

  //   lineLegend.append("rect")
  //     .attr("fill", function (d, i) {return color_key[i]; })
  //     .attr("width", 10).attr("height", 10);

  // }).catch(function(error) {
  //   console.log(error);
  // });


  // // Set initial param to be updated by reference to menus
  // var Fred1 = '1'

  // // Load data from fredData.csv
  // // ************************THIS LOADS THE TICKER DATA****************************
  // d3.csv("fredData.csv").then(function(fredData) {

  //   // Create filter to remove #N/A
  //   fredData = fredData.filter(function(fred) {
  //     return fred.Value_to_Max_Value_Ratio != "#N/A"
  //   });
    
  //   // Create filter to target selected ticker
  //   fredData =  fredData.filter(function(fred) {
  //     return fred['Category Number'] == Fred1;
  //   });

  //   // console.log(fredData)

  //   // Format the date and cast the respective values as needed
  //   fredData.forEach(function(data) {
  //     data.Date = parseDate(data.Date);
  //     data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
  //     data.number = data.number;
  //   });

    

  //   // Configure a time scale with a range between 0 and the chartWidth
  //   // Set the domain for the xTimeScale function
  //   // d3.extent returns the an array containing the min and max values for the property specified
  //   var xTimeScale = d3.scaleTime()
  //     .range([0, chartWidth])
  //     .domain(d3.extent(fredData, data => data.Date));

  //   // Configure a linear scale with a range between the chartHeight and 0
  //   // Set the domain for the xLinearScale function
  //   var yLinearScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, d3.max(fredData, data => data.Value_to_Max_Value_Ratio)]);


  //   // Configure a drawLine function which will use our scales to plot the line's points
  //   var drawLine = d3
  //     .line()
  //     .x(data => xTimeScale(data.Date))
  //     .y(data => yLinearScale(data.Value_to_Max_Value_Ratio))
  //     .curve(d3.curveMonotoneX);

  //   // Append an SVG path and plot its points using the line function
  //   chartGroup.append("path")
  //     // The drawLine function returns the instructions for creating the line for milesData
  //     .attr("d", drawLine(fredData))
  //     .classed("fred1line", true);

  // }).catch(function(error) {
  //   console.log(error);
  // });

  // // Set initial param to be updated by reference to menus
  // var Fred2 = '2'

  // // Load data from fredData.csv
  // // ************************THIS LOADS THE TICKER DATA****************************
  // d3.csv("fredData.csv").then(function(fredData) {

  //   // Create filter to remove #N/A
  //   fredData = fredData.filter(function(fred) {
  //     return fred.Value_to_Max_Value_Ratio != "#N/A"
  //   });
    
  //   // Create filter to target selected ticker
  //   fredData =  fredData.filter(function(fred) {
  //     return fred['Category Number'] == Fred2;
  //   });

  //   // console.log(fredData)

  //   // Format the date and cast the respective values as needed
  //   fredData.forEach(function(data) {
  //     data.Date = parseDate(data.Date);
  //     data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
  //     data["Category Number"] = data["Category Number"];
  //   });

    

  //   // Configure a time scale with a range between 0 and the chartWidth
  //   // Set the domain for the xTimeScale function
  //   // d3.extent returns the an array containing the min and max values for the property specified
  //   var xTimeScale = d3.scaleTime()
  //     .range([0, chartWidth])
  //     .domain(d3.extent(fredData, data => data.Date));

  //   // Configure a linear scale with a range between the chartHeight and 0
  //   // Set the domain for the xLinearScale function
  //   var yLinearScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, d3.max(fredData, data => data.Value_to_Max_Value_Ratio)]);


  //   // Configure a drawLine function which will use our scales to plot the line's points
  //   var drawLine = d3
  //     .line()
  //     .x(data => xTimeScale(data.Date))
  //     .y(data => yLinearScale(data.Value_to_Max_Value_Ratio))
  //     .curve(d3.curveMonotoneX);

  //   // Append an SVG path and plot its points using the line function
  //   chartGroup.append("path")
  //     // The drawLine function returns the instructions for creating the line for milesData
  //     .attr("d", drawLine(fredData))
  //     .classed("fred2line", true);

  // }).catch(function(error) {
  //   console.log(error);
  // });


  // // Set initial param to be updated by reference to menus
  // var Fred3 = '3'

  // // Load data from fredData.csv
  // // ************************THIS LOADS THE TICKER DATA****************************
  // d3.csv("fredData.csv").then(function(fredData) {

  //   // Create filter to remove #N/A
  //   fredData = fredData.filter(function(fred) {
  //     return fred.Value_to_Max_Value_Ratio != "#N/A"
  //   });
    
  //   // Create filter to target selected ticker
  //   fredData =  fredData.filter(function(fred) {
  //     return fred['Category Number'] == Fred3;
  //   });

  //   // console.log(fredData)

  //   // Format the date and cast the respective values as needed
  //   fredData.forEach(function(data) {
  //     data.Date = parseDate(data.Date);
  //     data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
  //     data["Category Number"] = data["Category Number"];
  //   });

    

  //   // Configure a time scale with a range between 0 and the chartWidth
  //   // Set the domain for the xTimeScale function
  //   // d3.extent returns the an array containing the min and max values for the property specified
  //   var xTimeScale = d3.scaleTime()
  //     .range([0, chartWidth])
  //     .domain(d3.extent(fredData, data => data.Date));

  //   // Configure a linear scale with a range between the chartHeight and 0
  //   // Set the domain for the xLinearScale function
  //   var yLinearScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, d3.max(fredData, data => data.Value_to_Max_Value_Ratio)]);

  //   // Configure a drawLine function which will use our scales to plot the line's points
  //   var drawLine = d3
  //     .line()
  //     .x(data => xTimeScale(data.Date))
  //     .y(data => yLinearScale(data.Value_to_Max_Value_Ratio))
  //     .curve(d3.curveMonotoneX);

  //   // Append an SVG path and plot its points using the line function
  //   chartGroup.append("path")
  //     // The drawLine function returns the instructions for creating the line for milesData
  //     .attr("d", drawLine(fredData))
  //     .classed("fred3line", true);

  // }).catch(function(error) {
  //   console.log(error);
  // });



  // // Set initial param to be updated by reference to menus
  // var Fred4 = '4'

  // // Load data from fredData.csv
  // // ************************THIS LOADS THE TICKER DATA****************************
  // d3.csv("fredData.csv").then(function(fredData) {

  //   // Create filter to remove #N/A
  //   fredData = fredData.filter(function(fred) {
  //     return fred.Value_to_Max_Value_Ratio != "#N/A"
  //   });
    
  //   // Create filter to target selected ticker
  //   fredData =  fredData.filter(function(fred) {
  //     return fred['Category Number'] == Fred4;
  //   });

  //   // console.log(fredData)

  //   // Format the date and cast the respective values as needed
  //   fredData.forEach(function(data) {
  //     data.Date = parseDate(data.Date);
  //     data.Value_to_Max_Value_Ratio = +data.Value_to_Max_Value_Ratio;
  //     data["Category Number"] = data["Category Number"];
  //   });

    

  //   // Configure a time scale with a range between 0 and the chartWidth
  //   // Set the domain for the xTimeScale function
  //   // d3.extent returns the an array containing the min and max values for the property specified
  //   var xTimeScale = d3.scaleTime()
  //     .range([0, chartWidth])
  //     .domain(d3.extent(fredData, data => data.Date));

  //   // Configure a linear scale with a range between the chartHeight and 0
  //   // Set the domain for the xLinearScale function
  //   var yLinearScale = d3.scaleLinear()
  //     .range([chartHeight, 0])
  //     .domain([0, d3.max(fredData, data => data.Value_to_Max_Value_Ratio)]);

  //   // Configure a drawLine function which will use our scales to plot the line's points
  //   var drawLine = d3
  //     .line()
  //     .x(data => xTimeScale(data.Date))
  //     .y(data => yLinearScale(data.Value_to_Max_Value_Ratio))
  //     .curve(d3.curveMonotoneX);

  //   // Append an SVG path and plot its points using the line function
  //   chartGroup.append("path")
  //     // The drawLine function returns the instructions for creating the line for milesData
  //     .attr("d", drawLine(fredData))
  //     .classed("fred4line", true);
     
  // }).catch(function(error) {
  //   console.log(error);
  // });

  // COMMENT STARTING HERE FOR THE VIZ 3 ERROR ///////////////////////////////////////////////////////////////////////

  var svg3 = d3.select("#visualization_3")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg3.append("g")
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
      console.log(data.number)
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
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis.tickFormat(d3.timeFormat("%m/%d/%Y")));

    chartGroup.append("g")
      .call(leftAxis);

  //right now is just 1 ticker. r is to make sure the graph is readable
    var financialGroup = chartGroup.selectAll("circle")
    .data(financeData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.date))
    .attr("cy", d => yLinearScale(d.value))
    .attr("r", d => (d.Volume)/6000000)
    .attr("fill", "blue")
    .attr("opacity", ".1");

    chartGroup.append("text")
      .attr(`transform`, `rotate(-90)`)
      .attr("y", 0 - margin.left + 5)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Value of Ticker ($)");

    chartGroup.append("text")
      .attr(`transform`, `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Date");

    var legend_keys = ["Selected Ticker's Volume"]
    var color_key = ["blue"]

    var lineLegend = chartGroup.selectAll(".lineLegend").data(legend_keys)
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

    }).catch(function(error) {
      console.log(error);
    })


  // COMMENT OUT TO HERE FOR THE VIZ 3 ERROR ///////////////////////////////////////////////////////////////////////

)};

  // When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);