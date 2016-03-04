initializeMap = function(){
  $(document).ready(function() {
    var locationHistoryLayer, lastKnownPositionLayer, lastKnownPosition, locaitonHistory, gmapURL, map, mapElement, options, videoURL, videoLayer;
    lastKnownPosition = "https://rawgit.com/Ravenstine/project-full-circle/master/last_position.kml?time=" + new Date().getTime();
    lastKnownPositionJSON = "https://rawgit.com/Ravenstine/project-full-circle/master/last_position.json?time=" + new Date().getTime();
    locationHistory = 'https://rawgit.com/Ravenstine/project-full-circle/master/location_history.kml?time=' + new Date().getTime();
    gmapURL = 'http://https://rawgit.com/Ravenstine/project-full-circle/master/gmap.kml?time=' + new Date().getTime();
    // videoURL = 'http://52.11.26.58:4567/mapfilter/z_Tk3EyXNpN8.kjg5KrIAJ1V0?time=' + new Date().getTime();
    options = {
      zoom: 6,
      center: {
        lat: 36.065473,
        lng: 120.389557
      },
      scrollwheel: false
    };
    mapElement = document.getElementById('fullcirclemap');
    map = new google.maps.Map(mapElement, options);
    setInterval(function(){
      var offset = $('header').height() || 0;
      $("#fullcirclemap").css("height", window.innerHeight - offset);
      $("#charm").css("height", window.innerHeight - offset);
      google.maps.event.trigger(map, 'resize');
    }, 500)
    window.gmapLayer = new google.maps.KmlLayer({
      url: gmapURL,
      map: map,
      preserveViewport: true,
      zIndex: 1
    });

    window.locationHistoryLayer = new google.maps.KmlLayer({
      url: locationHistory,
      map: map,
      preserveViewport: true,
      zIndex: 2,
      suppressInfoWindows: true
    });

    window.lastKnownPositionLayer = new google.maps.KmlLayer({
      url: lastKnownPosition,
      map: map,
      preserveViewport: true,
      zIndex: 3,
      suppressInfoWindows: true
    });

    
    google.maps.event.addListener(gmapLayer, "metadata_changed", function() {
      google.maps.event.trigger(map, 'resize');
      $.get(lastKnownPositionJSON, function(response){
        lastKnownCoordinates = response.Data[0]
        map.setCenter(new google.maps.LatLng(lastKnownCoordinates.Latitude, lastKnownCoordinates.Longitude))
      })
    });

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
    var legendDiv = document.createElement('div');
    $(legendDiv).css("background-color", "white");
    $(legendDiv).css("margin-right", "1em");
    $(legendDiv).css("padding", "5px");
    legendDiv.innerHTML = "<strong>Legend</strong><div><img src='http://www.followmee.com/images/map_icon/marker_green.png' />Current Position</div><div><img src='https://rawgit.com/Ravenstine/project-full-circle/master/video.png' />Video</div>";
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);

    var scrollButtonDiv = document.createElement('div');
    // $(legendDiv).css("background-color", "green");
    // $(legendDiv).css("margin-right", "1em");
    // $(legendDiv).css("padding", "5px");
    scrollButtonDiv.innerHTML = "<button id='scrollButton' style='background-color: #212121 !important; color: white; margin-bottom: 15px; height: 35px;' class='newsletter-form-button sqs-system-button sqs-editable-button-layout sqs-editable-button-style sqs-editable-button-shape'><strong style='text-transform: uppercase;'>More good stuff&nbsp;</strong><img src='https://rawgit.com/Ravenstine/project-full-circle/staging/glyphicons-213-down-arrow-inverted.png' style='width: 0.7em;' draggable='false'/></button>";
    $(scrollButtonDiv).on("click", function(e){
      $("html, body").animate({ scrollTop: $('#content-start').offset().top }, 1000);
    })
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(scrollButtonDiv);


    $(document).on("scroll", function(){
      if ($(document).scrollTop() >= 50) {
        $(scrollButtonDiv).fadeOut();
      } else {
        $(scrollButtonDiv).fadeIn();
      }
    })

  });
};
