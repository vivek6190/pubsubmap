window.lat = 37.7850;
window.lng = -122.4383;

var map;
var mark;
var lineCoords = [];
  
var initialize = function() {
  map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
  mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
};

window.initialize = initialize;

var redraw = function(payload) {
  lat = payload.message.lat;
  lng = payload.message.lng;
  console.log('lat ' + lat);
  console.log('log ' + log);


  map.setCenter({lat:lat, lng:lng, alt:0});
  mark.setPosition({lat:lat, lng:lng, alt:0});
  
  lineCoords.push(new google.maps.LatLng(lat, lng));

  var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true,
    strokeColor: '#2E10FF'
  });
  
  lineCoordinatesPath.setMap(map);
};

var pnChannel = "map3-channel";

var pubnub = new PubNub({
  publishKey:   '{{ PUB_KEY }}',
  subscribeKey: '{{ SUB_KEY }}'
});

pubnub.subscribe({channels: [pnChannel]});
pubnub.addListener({message:redraw});

setInterval(function() {
  pubnub.publish({channel:pnChannel, message:{lat:window.lat + 0.001, lng:window.lng + 0.01}});
}, 500);
