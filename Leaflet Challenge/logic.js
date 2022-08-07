// I worked with TA Erin Wills on this script.

  // Define a function we want to run once for each feature in the features array.
  // Give each feature a popup describing the place and time of the earthquake.
  function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + feature.geometry.coordinates[2] +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  function circleSize(feature){
    radius = feature.properties.mag
    return radius*5;
  }

  function circleColor(feature){
    depth = feature.geometry.coordinates[2]
    if(depth < 5){
      color = "#66ff33"
    }
    else if (depth < 7){
      color = "#009900"
    }
    else if (depth < 9){
      color = "#006600"
    }
    else {
      color = "#003300"
    }
    return color
   }

 // Define streetmap and darkmap layers.
 let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18
  });

  // Define baseMaps object to hold base layers.
  let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
  };
  
// Create map. Add the streetmap and earthquakes layers to display.
let myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [streetmap]
    });

// Add streetmap tile to map.
streetmap.addTo(myMap);

// Create layer. Data will be attached later.
let earthquakes = new L.LayerGroup();

// Create overlay object to hold overlay layer.
let overlayMaps = {
  Earthquakes: earthquakes
};

// Create a layer control.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL.
d3.json(queryUrl).then(function(data) {

  console.log(data)

  // Create GeoJSON layer containing the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  L.geoJSON(data, {
    onEachFeature: popUpMsg,
    pointToLayer: function(feature, latlong){
        return new L.CircleMarker(latlong, {
            radius: circleSize(feature),
            fillOpacity: 0.7
        })
    },
    style: function(feature){
      return {color: circleColor(feature)}
    }  
  }).addTo(earthquakes);
 

  earthquakes.addTo(myMap);


// Create legend.
let legend = L.control({position: "bottomright"});
legend.onAdd = function () {

    let div = L.DomUtil.create("div", "info legend"),
    // Define separation of colors.
        colorGrades = [0, 5, 7, 9],
    // Colors of the legend.
        colors = ["#66ff33", "#009900", "#006600", "#003300"];
    // Loop through magnitude intervals and generate a label with a colored square for each interval.
    for (var i = 0; i < colorGrades.length; i++) {
      div.innerHTML +=
          `<i style="background:${colors[i]}"></i>
          ${colorGrades[i]} ${colorGrades[i + 1] ? `&ndash; 
          ${colorGrades[i + 1]} <br> ` : "+"}`;
    }
    return div;
};

legend.addTo(myMap);
});