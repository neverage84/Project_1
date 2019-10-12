$(document).ready(function () {

    // may need to do postal code, city is not specific enough (i.e. fremont isn't recognized, but seattle is)
    // NEED GEOLOCATION API IN ORDER TO GET THE ZIP CODE 
    var breweryCity = "seattle"; //assuming this is the user's input 
    //var breweryState = "washington";

    var preferredDrink = "best long island";


    function displayNearbyBars() {


        // Not supported on It is not supported on Internet Explorer 10 and below, nor OperaMini.
        var latitude = 0;
        var longitude = 0;

        function ipLookUp() {
            $.ajax('http://ip-api.com/json')
                .then(
                    function success(response) {
                        console.log('User\'s Location Data is ', response);
                        console.log('User\'s Country', response.country);
                        console.log(response.lat);
                        latitude = response.lat;
                        console.log(response.lon);
                        longitude = response.lon;

                        var map;
                        var service;
                        var infowindow = new google.maps.InfoWindow(); // needed to add this, thanks to https://stackoverflow.com/questions/36360313/google-maps-places-api-javascript-cannot-read-property-setcontent-of-undefin

                        function initialize() {
                            console.log(latitude);
                            console.log(longitude);
                            var currentLocation = new google.maps.LatLng(latitude, longitude); 

                            map = new google.maps.Map(document.getElementById('map'), {
                                center: currentLocation,
                                zoom: 15
                            });

                            var request = {
                                location: currentLocation,
                                radius: '600',
                                type: ['restaurant']
                            };

                            service = new google.maps.places.PlacesService(map);
                            service.nearbySearch(request, callback);
                        }

                        function createMarker(place) {
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location
                            });

                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.setContent(place.name);
                                infowindow.open(map, this);
                            });
                        }

                        function callback(results, status) {
                            if (status == google.maps.places.PlacesServiceStatus.OK) {
                                for (var i = 0; i < results.length; i++) {
                                    console.log(results);
                                    var place = results[i];
                                    createMarker(results[i]);
                                }
                            }
                        }

                        initialize();

                    },

                    function fail(data, status) {
                        console.log('Request failed.  Returned status of',
                            status);
                    }

                );
        };
        ipLookUp();


        //var queryURL = "https://api.openbrewerydb.org/breweries?" + "&by_city=" + breweryCity;

        //var queryURL = "https://api.punkapi.com/v2/beers/";


        /*
        var queryURL = "";

        $.ajax({

            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log(response);
            $("#main-brewery-view").empty();
            var noMatch = 0;

            for (i = 0; i < 20; i++) {
                //console.log(response[i]);
                var breweryByPostalCode = response[i].postal_code;
                //console.log(response[0].postal_code);

                if (breweryByPostalCode.includes(yourPostalCode)) { // I probably can create a better search term (I think includes can also take any combination of 5 numbers not in order)
                    console.log("a brewery result that matches is " + response[i].name);

                    // how would I save each response[i] to a unique variable?
                    var breweryName = response[i].name;

                    var newP = $("<p>");
                    newP.text(breweryName);

                    var newDiv = $("<div>");
                    newDiv.attr("breweryName", breweryName);

                    newDiv.append(newP);

                    $("#main-brewery-view").append(newDiv);

                }
                else {
                    noMatch++;
                }

            }
            console.log("out of the API call, there were " + noMatch + " breweries that did not match your zip code");
        });
    }*/


    }
    displayNearbyBars();
});