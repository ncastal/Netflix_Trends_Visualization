var mapboxAccessToken = API_KEY;


var map = L.map('map',{
  center:[37.8, -96],
  zoom: 4
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);

L.geoJson(statesData).addTo(map);


function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(statesData, {style: style}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

        div.innerHTML += '<b>Population Density</b><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


var link = "data/map_data/netflix_statelatlong.csv";

  d3.csv(link, function(data) {
  for (var i = 0; i < data.length; i++) {
    var state_dic = data[i];
    var state = state_dic.State;
    var show = state_dic.Show;
    var longitude = state_dic.longitude;
    var latitude = state_dic.latitude;
    var cityMarkers = [longitude,latitude];
    var state_markers = [state,cityMarkers];
    // console.log(state_markers)
    // console.log(cityMarkers)
    var marker = L.circle([cityMarkers[1], cityMarkers[0]], {
      draggable: true,
      title: state,
    }).addTo(map);
    var popup = marker.bindPopup("<h5>" + state+ "</h6> <hr> <h6>" + show + "</h3>")
    // popup.openPopup();
  }
    console.log("DONE")
 

    
});



