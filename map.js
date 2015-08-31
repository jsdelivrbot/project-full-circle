window.initializeMap = function(){
  $(document).ready(function() {
    var ctaLayer, followMeeURL, gmapURL, map, mapElement, options;
    followMeeURL = "https://www.followmee.com/api/tracks.aspx?key=4915631036dcae1188bad47ababc6353&username=fullcircle&output=kml&function=currentfordevice&deviceid=10993763";
    gmapURL = 'https://rawgit.com/Ravenstine/project-full-circle/master/double-plus-good.kmz?raw=true';
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
};