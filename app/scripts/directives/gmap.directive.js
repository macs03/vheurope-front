(function () {
    'use strict';
    angular
        .module('vhEurope')
        .directive('gmap', function($interval) {
        // directive link function
        var link = function(scope, element, attrs) {
            var map, infoWindow;
            var directionsDisplay = null;
            var directionsService = null;
            var markers = [];
            // map config
            var mapOptions = {
                center: new google.maps.LatLng(40.45740, -3.70424),
                zoom: 20,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                disableDefaultUI: true
            };
        
            // init the map
            function initMap() {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsService = new google.maps.DirectionsService();

                    var request = {
                        origin: attrs.origin,
                        destination: attrs.destination,
                        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
                        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
                        provideRouteAlternatives: true
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setMap(map);
                            directionsDisplay.setDirections(response);
                        } 
                    });


                }
            }    
        
            // place a marker
            function setMarker(map, position, title, content) {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array
            
                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }
        
            // show the map and place some markers
            
            $interval(updateMap, 2000);

             function updateMap() {
                initMap();
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
                map.setZoom(5);
            }
        
            //setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});


})();
