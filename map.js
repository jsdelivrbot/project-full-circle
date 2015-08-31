google.maps.event.addDomListener(window, 'load', function() {
  var ctaLayer, followMeeURL, gmapURL, map, mapElement, options;
  followMeeURL = "https://www.followmee.com/api/tracks.aspx?key=4915631036dcae1188bad47ababc6353&username=fullcircle&output=kml&function=currentfordevice&deviceid=10993763";
  gmapURL = 'https://gist.githubusercontent.com/Ravenstine/a3b18c71942a812b5b11/raw/050d592f4c2b1f9697175dba58260d132f93c769/testmap.kml';
  options = {
    zoom: 3,
    center: {
      lat: 36.574595,
      lng: -14.487714
    },
    scrollwheel: false
  };
  mapElement = document.getElementById('fullcirclemap');
  map = new google.maps.Map(mapElement, options);
  ctaLayer = new google.maps.KmlLayer({
    url: gmapURL,
    map: map,
    preserveViewport: true
  });
  return ctaLayer = new google.maps.KmlLayer({
    url: followMeeURL,
    map: map,
    preserveViewport: true
  });
});
