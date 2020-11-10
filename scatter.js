var directoryPromise = d3.json("classData.json");

var initGraph = function(penguins){
    var screen = {width:600, height:600}
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
var xScale = d3.scaleLinear()
.domain([0,50])
.range([0,screen.width])

var yScale = d3.scaleLinear()
.domain([0,100])
.range([screen.height,0])

var drawPlot = function(penguins, screen, xScale, yScale){
    d3.select("svg")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin){
        return xScale(hwMean(penguin));
    })
    .attr("cy",function(penguin){
        return yScale(getFinalGrade(penguin))
    })
    .attr("r", 5)
    .attr("fill", "red")
}
drawPlot(penguins, screen, xScale, yScale);
}

var getFinalGrade = function(penguins){
    var getGrade = penguins.final.map(function(grade){
        return grade.grade;
    })
    return getGrade;
}

var hwMean = function(penguins){
    var hwGrade = penguins.homework.map(function(grade){
        return grade.grade
    })
    return d3.mean(hwGrade).toFixed(0);
}

var successFCN = function(penguins){
    console.log("data", penguins);
    initGraph(penguins);
}
var failFCN = function(errMessage){
    console.log("failure", errMessage)
    d3.selectAll("title")
    .text("file not found");
};
directoryPromise.then(successFCN, failFCN);