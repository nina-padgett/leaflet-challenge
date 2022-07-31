// Define a function to run once for each feature in the features array. 
// Give each feature a popup describing the place and time of the earthquake.
function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

 // Define streetmap and darkmap layers.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18
});

// Define a baseMaps object to hold base layers.
var baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [streetmap]  
});

// Add streetmap tile to map.
streetmap.addTo(myMap);

// Create layer. Data will be attached later.
var earthquakes = new L.LayerGroup();

// Create overlay object to hold overlay layer.
var overlayMaps = {
    Earthquakes: earthquakes
};

// Create a layer control. Pass in baseMaps and overlayMaps. All layers are added through these lines of code.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Store API endpoint as queryURL.
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Perform get request to the queryURL.
d3.json(queryURL).then(function (data) {
    // Send the data.features object to the createFeatures function
//     createFeatures(data.features);
// });

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
// Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(data, {
        onEachFeature: popUpMsg
    }).addTo(earthquakes);

    earthquakes.addTo(myMap);
});


// function createFeatures(earthquakeData) {

//     // Define a function that we want to run once for each feature in the features array.
//     // Give each feature a popup that describes the place and time of the earthquake.
//     function onEachFeature(feature, layer) {
//       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }
  
//     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//     // Run the onEachFeature function once for each piece of data in the array.
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
  
//     // Send our earthquakes layer to the createMap function/
//     createMap(earthquakes);
//   }
  
//   function createMap(earthquakes) {
  
//     // Create the base layers.
//     var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })
  
//     var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });
  
//     // Create a baseMaps object.
//     var baseMaps = {
//       "Street Map": street,
//       "Topographic Map": topo
//     };
  
//     // Create an overlay object to hold our overlay.
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load.
//     var myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 5,
//       layers: [street, earthquakes]
//     });
  
//     // Create a layer control.
//     // Pass it our baseMaps and overlayMaps.
//     // Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(myMap);
  
//   }






// var map = L.map('map').setView([41.881832, -87.623177], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

// let marker = L.marker([41.881832, -87.623177], {
//     title: "earthquake",
// }).addTo(map);

// marker.bindPopup("earthquake")