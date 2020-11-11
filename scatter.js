var directoryPromise = d3.json("classData.json");

var getIMG = function(image){
    return "imgs/"+image.picture;
}

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
    d3.select("#graph")
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
    
   .on("mouseenter", function(penguins){
        console.log("hovering");
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden", false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#tooltip #img img")
        .attr("src", getIMG(penguins))
    })
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