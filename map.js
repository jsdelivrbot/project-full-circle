initializeMap = function(){
  $(document).ready(function() {
    var ctaLayer, followMeeURL, gmapURL, map, mapElement, options, videoURL, videoLayer;
    followMeeURL = "https://www.followmee.com/api/tracks.aspx?key=4915631036dcae1188bad47ababc6353&username=fullcircle&output=kml&function=currentfordevice&deviceid=10993763";
    gmapURL = 'http://52.11.26.58:4567/gmap?time=' + new Date().getTime();
    videoURL = 'http://52.11.26.58:4567/mapfilter/z_Tk3EyXNpN8.kjg5KrIAJ1V0?time=' + new Date().getTime();
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
      url: followMeeURL,
      map: map,
      preserveViewport: true
    });
    videoLayer = new google.maps.KmlLayer({
      url: videoURL,
      map: map,
      preserveViewport: true
    });
    gmapLayer = new google.maps.KmlLayer({
      url: gmapURL,
      map: map,
    });
    google.maps.event.addListener(gmapLayer, "metadata_changed", function() {
      google.maps.event.trigger(map, 'resize');
    });
    // google.maps.event.addListener(videoLayer, "click")
    videoLayer.addListener('click', function(kmlEvent){
      var text = kmlEvent.featureData.description
      $("#fullcirclemap").animate({width: "60%"}, function(){
        $("#charm").css("width", "40%");
        $("#charm").html(text);
      });
    });
  });
};