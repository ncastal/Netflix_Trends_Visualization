d3.csv("data/visualizations_data/IMDB_netflix.csv").then(function(netflixIMDB){
    d3.csv("data/visualizations_data/IMDB_not_netflix.csv").then(function(notNetflixIMDB){
        netflixRatings=[]
        years=[]
        
        for(var i = 0; i<netflixIMDB.length;i++){
            netflixRatings.push(netflixIMDB[i].IMDB_rating)
            years.push(netflixIMDB[i].Premiere)
        }
        console.log(netflixRatings)

        trace3={
            x:years,
            y:netflixRatings,
            type:'scatter',
            name:"Netflix Shows/Movies",
            marker: {
                color: 'rgba(219, 64, 82, 0.7)',
                line: {
                  color: 'rgba(219, 64, 82, 1.0)',
                  width: 2
                }
              }
        }

        notNetflixRatings=[]
        years=[]

        for(var i =0;i<notNetflixIMDB.length;i++){
            notNetflixRatings.push(notNetflixIMDB[i].IMDB_rating)
            years.push(notNetflixIMDB[i].date_added)
        }
        trace4={
            x:years,
            y:notNetflixRatings,
            type:'scatter',
            name:"Non-Netflix Shows/Movies",
            marker: {
                color: 'rgba(55,128,191,0.7)',
                line: {
                  color: 'rgba(55,128,191,1.0)',
                  width: 2
                }}
        }
        data2=[trace3,trace4]

        layout={
            title:{
                text:"IMDB Rating of Shows/Movies on Netflix"
            },
            xaxis:{
                title:"Year"
            },
            yaxis:{
                title:"IMDB Rating"
            },
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)'
        };

        Plotly.newPlot('scatter',data2,layout, {responsive: true})
    })
})