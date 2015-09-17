initializeMap = function(){
  $(document).ready(function() {
    var locationHistoryLayer, lastKnownPositionLayer, lastKnownPosition, locaitonHistory, gmapURL, map, mapElement, options, videoURL, videoLayer;
    lastKnownPosition = "https://www.followmee.com/api/tracks.aspx?key=4915631036dcae1188bad47ababc6353&username=fullcircle&output=kml&function=currentfordevice&deviceid=10993763&dontcacheme=" + new Date().getTime();
    locationHistory = 'http://52.11.26.58:4567/location-history?time=' + new Date().getTime();
    gmapURL = 'http://52.11.26.58:4567/gmap?time=' + new Date().getTime();
    // videoURL = 'http://52.11.26.58:4567/mapfilter/z_Tk3EyXNpN8.kjg5KrIAJ1V0?time=' + new Date().getTime();
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
    window.gmapLayer = new google.maps.KmlLayer({
      url: gmapURL,
      map: map,
      zIndex: 1
    });

    // videoLayer = new google.maps.KmlLayer({
    //   url: videoURL,
    //   map: map,
    //   preserveViewport: true,
    //   suppressInfoWindows: true
    // });
    google.maps.event.addListener(gmapLayer, "metadata_changed", function() {
      google.maps.event.trigger(map, 'resize');
      // window.locationHistoryLayer = new google.maps.KmlLayer({
      //   url: locationHistory,
      //   map: map,
      //   preserveViewport: true,
      //   zIndex: 2
      // });
      window.lastKnownPositionLayer = new google.maps.KmlLayer({
        url: lastKnownPosition,
        map: map,
        preserveViewport: true,
        zIndex: 3
      });
    });
    setInterval(function(){
      var offset = $('header').height() || 0;
      $("#fullcirclemap").css("height", window.innerHeight - offset);
      $("#charm").css("height", window.innerHeight - offset);
      google.maps.event.trigger(map, 'resize');
    }, 500)
    // google.maps.event.addListener(videoLayer, "click")
    var interactable = function(kmlEvent){
      var text = kmlEvent.featureData.description;
      if(text){
        var matches = text.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/);
      } else {
        var matches = undefined;
      }
      if (matches){
        var videoId = matches[matches.length - 1]
        $("#fullcirclemap").animate({width: "60%"}, 500, function(){
          $("#charm").css("width", "40%");
          $("#charm").css("z-index", "500");
          var embed = '<div id="video"><div id="close-video-button"><img src="https://rawgit.com/Ravenstine/project-full-circle/master/close-icon.png" /></div><iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe></div>'
          $("#charm").html(embed);
          $("#close-video-button").on("click", function(){
            $("#fullcirclemap").animate({width: "100%"}, 500, function(){
              $("#charm").html("")
              $("#charm").css("width", "0%");
              $("#charm").css("z-index", "-1");
            })
          })
          google.maps.event.trigger(map, 'resize', function(){
            map.setCenter(new google.maps.LatLng(kmlEvent.latLng.G, kmlEvent.latLng.K));
          });
        });
      } 

    };

    // videoLayer.addListener('click', interactable);
    gmapLayer.addListener("click", interactable);
  });
};