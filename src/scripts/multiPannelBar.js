export function drawMultiPannelBar(data, mapData){
    // console.log(data.length)
    // var initial_index = 0, final_index = 4
    // var margin = {
    //     top: 20, 
    //     right: 20, 
    //     bottom: 30, 
    //     left: 80
    // },
    // padding = {
    //     top: 60, 
    //     right: 60, 
    //     bottom: 60, 
    //     left: 60
    // },
    // width = 860 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    // var color = 13034239

    // console.log("#"+(color).toString(16).toUpperCase())
    const h = 400, w = 400
    var margin = {top: 5, right: 5, bottom: 5, left: 5}

    var svg = d3.select("#viz_area_5")
    .append("g")
    .attr("width", w)
    .attr("height", h)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("x", 0)
    .attr("y", 0)

    // var graph_i = svg.attr("transform", 
    // "translate(" + margin.left + "," + margin.top + ")")

    // const width = w - margin.left - margin.right,
    // height = h - margin.top - margin.bottom;
    var x = d3.scaleBand().domain(data[0].Players.map(function(d) {
        return d.Name
    })).range([0, 350])

    var y = d3.scaleLinear().range([280, 0])
    .domain([0, d3.max(data[0].Players, function(d){
        return d.Minutes
    })])

    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y)

    svg.append("g")
    .attr("transform", "translate(50," + 280 + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".35em")
    .attr("y", 0)
    .attr("x", -65)


    svg.append("g")
    .attr("transform", "translate(50)")
    .call(yAxis)
    .selectAll("text")
    .attr("x", 30)
    .attr("transform", "translate(-40)")
    


    // var group = d3.select("#viz_area_end")

    // for (let i = 0; i < final_index; i++) {
    //     console.log("test")
    //     group.append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //     .attr("fill", "#"+(color).toString(16).toUpperCase())
    //     color += 2000
    // }
}
//     var w = 500
//     var h = 500

//     var d_test = [15, 10, 15]


//     var xScale = d3.scaleBand()
//                     .domain(d3.range(data[0].Players.length))
//                     .range([0, 500])
//                     .paddingInner(0.05)

//     const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data[0].Players, function (d) { return d.Minutes; })])
//     .range([400, 0])

//     var svg = d3.select("#viz_area_4")
//     .attr("width", w)
//     .attr("height", h)
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("x", 0)
//     .attr("y", 0)


//     svg.append("g")
//     // .append("g").attr("transform", "translate(50," + 400 + ")")
//     .selectAll("rect")
//     .data(data[0].Players)
//     .enter()
//     .append("rect")
//     .attr("x", function(d, i){
//         return xScale(i) 
//     })
//     .attr("y", 0)
//     .attr("width", 20)
//     .attr("height", function(d, i){
//         return h-yScale(d.Minutes)
//         // return 500-yScale(d.Minutes)
//     })

// }
// //     var height = 900, width = 900

// //     var barWidth = 40, barOffset = 20;
// //     var svg = d3.select("#viz_area_4").attr("width", width).attr("height", height)
// //     svg = svg.append("svg").attr("width", 500).attr("height", 100)
// //     // // var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
// //     // // svg.append("rect").attr("x", x(100)).attr("y", 100).attr("width", 100).attr("height", 100).style("fill", "blue")

// //     // svg.append("svg").attr("width", width).attr("height", height)


// //     // const playersName = [...mapData.get("Atlanta United").keys()]
// //     // console.log("playersName")
// //     // console.log(mapData.get("Atlanta United"))

// //     // const minutes = [...mapData.get("Atlanta United").values()]
// //     // console.log(minutes)
// //     // console.log("minutes")

// //     // const usedData = data[0].Players
// //     // console.log(usedData)

// //     // const usedDataMap = mapData.get("Atlanta United")
// //     // // usedDataMap.forEach(d => {
// //     // //     console.log(d)
// //     // // })

// //     // var xScale = d3.scaleBand()
// //     //                 .domain(d3.range(playersName.length))
// //     //                 .range([0, 500])
// //     //                 .paddingInner(0.05)

// //     // var xAxis = d3.axisBottom().scale(xScale)
                    

// //     // svg.append("g").attr("transform", "translate(100," + (height-200) + ")")
// //     // .call(xAxis)
// //     // .selectAll("text")
// //     // .attr("y", 0)
// //     // .attr("x", 6)
// //     // .attr("dy", ".35em")
// //     // .attr("transform", "rotate(-90)")
// //     // .style("text-anchor", "end");

// //     // const yScale = d3.scaleLinear().domain([0, d3.max(minutes, function (d) { return d; })]).range([180, 0]).range([400, 0]);
// //     // var yAxis = d3.axisLeft().scale(yScale)

// //     // svg.append("g")
// //     // .attr("transform",  "translate(100," + (height - 550-51) + ")")
// //     // .call(yAxis)
// //     // .selectAll("text")
// //     // .attr("x", 30)
// //     // .attr("transform", "translate(-40)")

// //     svg.selectAll("rect")
// //     .data(data[0])
// //     .enter()
// //     .append("rect")
// //     .attr("x", 0)
// //     .attr("y", 0)
// //     .attr("width", 20)
// //     .attr("height", 100)



// //     // .attr("transform",  "translate(100," + (-height) + ")")
// //     // svg.selectAll("rect")
// //     // .data(data[0])
// //     // .enter()
// //     // .append("rect")
// //     // .attr("x", 0)
// //     // .attr("y", 0)
// //     // .attr("width", 20)
// //     // .attr("height", 100)
// //     // .attr("x", function(d,i){
// //     //     return i
// //     // })
// //     // .attr("y", function(d){
// //     //     //return yScale(d)
// //     //     return d.Minutes
// //     // })
// //     // .attr("width", xScale.bandwidth())
// //     // .attr("height", function(d){
// //     //     return d
// //     // })
// //     // .data(usedDataMap)
// //     // .enter()
// //     // .append("rect")
// //     // .attr("x", function(d,i){
// //     //     return xScale(i)
// //     //     // return i*23
// //     // })
// //     // .attr("y", function(d){
// //     //     //return yScale(d)
// //     //     return 3000-d
// //     // })
// //     // .attr("width", xScale.bandwidth())
// //     // .attr("height", function(d){
// //     //     return d
// //     // })
    
// //     // svg.selectAll("rect")
// //     // .data(usedData)
// //     // .enter()
// //     // .append("rect")
// //     // .attr("x", function(d,i){
// //     //     return xScale(i)
// //     //     // return i*23
// //     // })
// //     // .attr("y", function(d){
// //     //     return yScale(d.Minutes)
// //     //     // return 3000-d.Minutes
// //     // })
// //     // .attr("width", xScale.bandwidth())
// //     // .attr("height", function(d){
// //     //     return d.Minutes
// //     // })

// // } 