function groups(data,value){
    //console.log(data);
    var result=[];
    for(var i = 0; i < data.length; i++){
        str=data[i][value];
        str=str.replace(/, /g,",");
        res=str.split(",");
        for(var j = 0; j<res.length;j++){
            result.push(res[j]);
        };
    };

    return result;
};

function calculate(result){
    var counts=[]
    var words=[];
    for(var i = 0; i< result.length; i++){
        if (array_contains(words, result[i])) {
            for(var j= 0; j<counts.length;j++){
                if(counts[j].x==result[i]){
                    counts[j].value++;
                    break;
                }
            }
           
        } else {
            words.push(result[i]);
            counts.push({"x":result[i],"value":1});
        }
    };
    return counts;
};
//function that returns true if a word is already in the list
function array_contains(array, value) {
    for (var i=0; i<array.length; i++)
        if (array[i] == value)
            return true;
    return false;
};

d3.json("../../data/visualizations_data/netflix_us_shows.json").then(function(netflixShows){
    
        d3.json("../../data/visualizations_data/us_shows.json").then(function(notNetflix){
            console.log(netflixShows)
            console.log(notNetflix)
            netflixGenres=calculate(groups(netflixShows,"listed_in"))
            notNetflixGenres=calculate(groups(notNetflix,"listed_in"))
            console.log(netflixGenres)
            console.log(notNetflixGenres)

            anychart.onDocumentReady(function(){

                var chart =anychart.tagCloud(netflixGenres);
          
                chart.title("Genres of Netflix Produced Shows");
          
                chart.angles([0]);
        
                chart.angles([-30,10,30]);
          
                chart.colorRange('80%');
          
                chart.container("container");
          
                chart.draw();
            });

            anychart.onDocumentReady(function(){
        
                var chart =anychart.tagCloud(notNetflixGenres);
          
                chart.title("Genres of Shows/Movies Not Produced by Netflix");
          
                chart.angles([0]);
        
                chart.angles([-30,10,30]);
          
                chart.colorRange('80%');
          
                chart.container("container2");
          
                chart.draw();
            });
            var yearAddedNetflix=calculate(groups(netflixShows,"Premiere"))
            var label=[]
            var num=[]

            for(var i=0;i<yearAddedNetflix.length;i++){

                label.push(yearAddedNetflix[i].x);
                num.push(yearAddedNetflix[i].value);
        
            };
            trace1={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Produced by Netflix",
                marker: {
                    color: 'rgba(219, 64, 82, 0.7)',
                    line: {
                      color: 'rgba(219, 64, 82, 1.0)',
                      width: 2
                    }
                  }
            }

            var yearAddedNotNetflix=calculate(groups(notNetflix,"date_added"))
            label=[]
            num=[]
            for(var i=0;i<yearAddedNotNetflix.length;i++){

                label.push(yearAddedNotNetflix[i].x);
                num.push(yearAddedNotNetflix[i].value);
        
            };
            trace2={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Not Produced by Netflix",
                marker: {
                    color: 'rgba(55,128,191,0.7)',
                    line: {
                      color: 'rgba(55,128,191,1.0)',
                      width: 2
                    }}
            }
            data=[trace1,trace2];
        
            layout={
                title:{
                    text:"Number of Shows Added to Netflix"
                },
                xaxis:{
                    title:"Year"
                },
                yaxis:{
                    title:"Number of Shows"
                },
                barmode:"relative",
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
        
            Plotly.newPlot("bar",data,layout, {responsive: true});

            netflixRated=[]
            for(var i =0; i<netflixShows.length;i++){
                if(typeof netflixShows[i].rating ==='object'){
                    netflixShows[i].rating="NR"
                }
                netflixRated.push(netflixShows[i].rating)
            }
            console.log(netflixRated)
            netflixRated=calculate(netflixRated)
            console.log(netflixRated)
            var label=[];
            var num=[];
            for(var i=0;i<netflixRated.length;i++){

                label.push(netflixRated[i].x);
                num.push(netflixRated[i].value);

            }
            var data = [{
                values:num,
                labels:label,
                type:'pie'
            }];

            var layout = {
                title:{
                    text:"Rating of Shows and Movies Produced by Netflix"
                },
                paper_bgcolor: 'rgba(245,246,249,1)'
            };

            Plotly.newPlot('pie',data,layout, {responsive: true});

            notNetflixRated=[]
            for(var i =0; i<notNetflix.length;i++){
                if(typeof notNetflix[i].rating ==='object'){
                    notNetflix[i].rating="NR"
                }
                notNetflixRated.push(notNetflix[i].rating)
            }
            notNetflixRated=calculate(notNetflixRated)
            //console.log(netflixRated)
            var label=[];
            var num=[];
            for(var i=0;i<notNetflixRated.length;i++){

                label.push(notNetflixRated[i].x);
                num.push(notNetflixRated[i].value);

            }
            var data = [{
                values:num,
                labels:label,
                type:'pie'
            }];

            var layout = {

                title:{
                    text:"Rating of Shows and Movies Not Produced by Netflix"
                },
                paper_bgcolor: 'rgba(245,246,249,1)'
            };

            Plotly.newPlot('pie2',data,layout, {responsive: true});

            var selector= d3.select("body")
            .select("select")
            .attr("id","genre")
            .selectAll("option")
            .data(notNetflixGenres)
            .enter().append("option")
            .text(d=>d.x)
            .attr("value",d=> d.x) 
            movieOrShow=calculate(groups(netflixShows,"type"))
            console.log(movieOrShow)
            var selector2=d3.select("body")
            .selectAll("select")
            .attr("id","type")
            .selectAll("option")
            .data(movieOrShow)
            .enter().append("option")
            .text(d=>d.x)
            .attr("value",d=>d.x)
        })

})



d3.select("#genre")
    .on("change",function(d){
        value=this.value;
        console.log(value)
        d3.json("../data/visualizations_data/netflix_us_shows.json").then(function(netflixShows){
            d3.json("../data/visualizations_data/us_shows.json").then(function(notNetflix){
                filterNetflix=netflixShows.filter(function(n){
                    return n.listed_in.includes(value)
                })
                console.log(filterNetflix)
                filterNotNetflix=notNetflix.filter(function(n){
                    return n.listed_in.includes(value)
                })
                console.log(filterNotNetflix)
                var yearAddedNetflix=calculate(groups(filterNetflix,"Premiere"))
            var label=[]
            var num=[]

            for(var i=0;i<yearAddedNetflix.length;i++){

                label.push(yearAddedNetflix[i].x);
                num.push(yearAddedNetflix[i].value);
        
            };
            trace1={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Produced by Netflix",
                marker: {
                    color: 'rgba(219, 64, 82, 0.7)',
                    line: {
                      color: 'rgba(219, 64, 82, 1.0)',
                      width: 2
                    }
                  }
            }

            var yearAddedNotNetflix=calculate(groups(filterNotNetflix,"date_added"))
            label=[]
            num=[]
            for(var i=0;i<yearAddedNotNetflix.length;i++){

                label.push(yearAddedNotNetflix[i].x);
                num.push(yearAddedNotNetflix[i].value);
        
            };
            trace2={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Not Produced by Netflix",
                marker: {
                    color: 'rgba(55,128,191,0.7)',
                    line: {
                      color: 'rgba(55,128,191,1.0)',
                      width: 2
                    }}
            }
            data=[trace1,trace2];
        
            layout={

                title:{
                    text:"Number of Shows Added to Netflix"
                },
                xaxis:{
                    title:"Year"
                },
                yaxis:{
                    title:"Number of Shows"
                },
                barmode:"relative",
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
        
            Plotly.newPlot("bar",data,layout, {responsive: true});

            })
        })
})

d3.select("#type")
    .on("change",function(d){
        value=this.value;
        console.log(value)
        d3.json("../data/visualizations_data/netflix_us_shows.json").then(function(netflixShows){
            d3.json("../data/visualizations_data/us_shows.json").then(function(notNetflix){
                filterNetflix=netflixShows.filter(function(n){
                    return n.type.includes(value)
                })
                console.log(filterNetflix)
                filterNotNetflix=notNetflix.filter(function(n){
                    return n.type.includes(value)
                })
                console.log(filterNotNetflix)
                var yearAddedNetflix=calculate(groups(filterNetflix,"Premiere"))
            var label=[]
            var num=[]

            for(var i=0;i<yearAddedNetflix.length;i++){

                label.push(yearAddedNetflix[i].x);
                num.push(yearAddedNetflix[i].value);
        
            };
            trace1={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Produced by Netflix",
                marker: {
                    color: 'rgba(219, 64, 82, 0.7)',
                    line: {
                      color: 'rgba(219, 64, 82, 1.0)',
                      width: 2
                    }
                  }
            }

            var yearAddedNotNetflix=calculate(groups(filterNotNetflix,"date_added"))
            label=[]
            num=[]
            for(var i=0;i<yearAddedNotNetflix.length;i++){

                label.push(yearAddedNotNetflix[i].x);
                num.push(yearAddedNotNetflix[i].value);
        
            };
            trace2={
                x:label,
                y:num,
                type:'bar',
                name:"Shows added Not Produced by Netflix",
                marker: {
                    color: 'rgba(55,128,191,0.7)',
                    line: {
                      color: 'rgba(55,128,191,1.0)',
                      width: 2
                    }}
            }
            data=[trace1,trace2];
        
            layout={

                title:{
                    text:"Number of Shows Added to Netflix"
                },
                xaxis:{
                    title:"Year"
                },
                yaxis:{
                    title:"Number of Shows"
                },
                barmode:"relative",
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
        
            Plotly.newPlot("bar",data,layout, {responsive: true});

            })
        })
});
