/*
// ** BAR SEARCH CODE **

$(document).ready(function () {
    // may need to do postal code, city is not specific enough (i.e. fremont isn't recognized, but seattle is)
    // NEED GEOLOCATION API IN ORDER TO GET THE ZIP CODE
    var breweryCity = "seattle"; //assuming this is the user's input
    //var breweryState = "washington";
    var preferredDrink = "best long island";
    var latitude;
    var longitude;
    var currentLocation;
    //   window.onload = function() {
    //     var startPos;
    //     var geoSuccess = function(position) {
    //       startPos = position;
    //       //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    //       //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    //       console.log(
    //         "Geoposition gives " + startPos.coords.latitude + " for latitutde"
    //       );
    //       console.log(
    //         "Geoposition gives " + startPos.coords.longitude + " for longitude"
    //       );
    //       latitude = startPos.coords.latitude;
    //       longitude = startPos.coords.longitude;
    //     };
    //     navigator.geolocation.getCurrentPosition(geoSuccess);
    //   };

    // Not supported on It is not supported on Internet Explorer 10 and below, nor OperaMini.

    function ipLookUp() {
        $.ajax("http://ip-api.com/json").then(
            function success(response) {
                console.log("User's Location Data is ", response);
                console.log("User's Country", response.country);
                console.log("IP - API gives " + response.lat + " for latitude");
                latitude = response.lat;
                console.log("IP - API gives " + response.lon + " for longitude");
                longitude = response.lon;

                var map;
                var service;
                var infowindow = new google.maps.InfoWindow(); // needed to add this, thanks to https://stackoverflow.com/questions/36360313/google-maps-places-api-javascript-cannot-read-property-setcontent-of-undefin
                function initialize() {
                    console.log(latitude);
                    console.log(longitude);
                    currentLocation = new google.maps.LatLng(latitude, longitude);
                    map = new google.maps.Map(document.getElementById("map"), {
                        center: currentLocation,
                        zoom: 15
                    });
                    var request = {
                        location: currentLocation,
                        radius: "800",
                        type: ["bar"],
                        fields: ['name', 'formatted_address', 'place_id', 'geometry']
                    };
                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);

                }
                function createMarker(place) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    console.log(place);
                    var openNow = "";
                    if (place.opening_hours.open_now === true) {
                        openNow = "Yes!"
                    }
                    else {
                        openNow = "No";
                    }
                    google.maps.event.addListener(marker, "click", function () {
                        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                            'Is this place open now? ' + openNow + '<br>' +
                            'Place Rating: ' + place.rating + '</div>');
                        infowindow.open(map, this);
                    });
                }
                function createMarkerSelf() {

                    var marker = new google.maps.Marker({
                        position: currentLocation,
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                    });
                    console.log(marker.position);
                }
                function callback(results, status) {

                    createMarkerSelf();
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {

                            var place = results[i];
                            createMarker(results[i]);

                        }
                    }
                }
                initialize();
            },
            function fail(data, status) {
                console.log("Request failed.  Returned status of", status);
            }
        );
    }
    ipLookUp();
});

var placesList = {};

$("#SubmitButton").on("click", function (event) {
    event.preventDefault();
    $.ajax("http://ip-api.com/json").then(function success(response) {
        console.log("User's Location Data is ", response);
        console.log("User's Country", response.country);
        console.log("IP - API gives " + response.lat + " for latitude");
        latitude = response.lat;
        console.log("IP - API gives " + response.lon + " for longitude");
        longitude = response.lon;
        console.log("Button Works");
        var map;
        var service;
        var infowindow = new google.maps.InfoWindow();

        function createMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            console.log(place);
            if (place.opening_hours.open_now === true) {
                openNow = "Yes!"
            }
            else {
                openNow = "No";
            }
            google.maps.event.addListener(marker, "click", function () {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Is this place open now? ' + openNow + '<br>' +
                    'Place Rating: ' + place.rating + '</div>');
                infowindow.open(map, this);
            });
            //   service.getDetails(detailsRequest, callback);

            //   placesList[place.name] = placeDetails
        }

        function initialize() {
            currentLocation = new google.maps.LatLng(latitude, longitude);
            map = new google.maps.Map(document.getElementById("map"), {
                center: currentLocation,
                zoom: 15
            });
            var searchInput = $("#SearchField")
                .val()
                .trim()
                .toLowerCase();

            var request = {
                location: currentLocation,
                radius: "5",
                query: searchInput + " cocktail"
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
        }
        function createMarkerSelf() {
            var marker = new google.maps.Marker({
                position: currentLocation,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
        }
        function callback(results, status) {
            createMarkerSelf();
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    createMarker(results[i]);

                }
            }
        }
        initialize();
    });
    //   var map;
    //   var service;
    //   var infowindow;

    //   function initMap() {
    //     var seattle = new google.maps.LatLng(47.608, -122.33);

    //     infowindow = new google.maps.InfoWindow();

    //     map = new google.maps.Map(document.getElementById("map"), {
    //       center: seattle,
    //       zoom: 15
    //     });

    //     var searchInput = $("#SearchField")
    //       .val()
    //       .trim()
    //       .toLowerCase();
    //     var request = {
    //       query: searchInput + "cocktail",
    //       fields: ["name", "geometry"]
    //     };
    //     console.log(searchInput);

    //     var service = new google.maps.places.PlacesService(map);

    //     service.findPlaceFromQuery(request, function(results, status) {
    //       if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //           createMarker(results[i]);
    //         }
    //         map.setCenter(results[0].geometry.location);
    //       }
    //     });
    //   }
    //   initMap();
});
*/




























// ** COCKTAIL SEARCH CODE **

$(document).ready(function () {

    var liquor = ["bourbon"];
    var lookup = [];
    var lookupIndex = 0;
    var maxResults = 3;  // Set this limit when ready for go live.
    var liquorURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor;
    var idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

    function getLiquor() {
        // AJAX call to gather liquor information
        $.ajax({
            url: liquorURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            for (i = 0; i < response.drinks.length && i < maxResults; i++) {
                console.log("Cocktail Name: " + response.drinks[i].strDrink);
                console.log("ID: " + response.drinks[i].idDrink);
                lookup.push(response.drinks[i].idDrink);
                console.log(lookup);
            };
            getID(null);
        });
    }

    function getID(response) {
        if (response !== null) {
            // console.log(response);

            var searchImage = $("<div class='search-image'>");
            var imgURL = response.drinks[0].strDrinkThumb;
            var image = $("<img>").attr("src", imgURL).attr("height", "125px").attr("width", "125px");
            searchImage.append(image);

            var searchDiv = $("<div class='cocktail-search'>");
            var name = response.drinks[0].strDrink;
            var nameText = $("<p class='search-text'>").text("Cocktail Name: " + name).css("font-weight", "bold");
            searchDiv.append(nameText);

            var category = response.drinks[0].strCategory;
            var categoryText = $("<p class='search-text'>").text("Category: " + category);
            searchDiv.append(categoryText);

            var ingredients = [response.drinks[0].strIngredient1 + ", " + response.drinks[0].strIngredient2 + ", " + response.drinks[0].strIngredient4 + ", " + response.drinks[0].strIngredient4];
            var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + ingredients);
            searchDiv.append(ingredientsText);

            var instructions = response.drinks[0].strInstructions;
            var instructionsText = $("<p class='search-text'>").text("Instructions: " + instructions);
            searchDiv.append(instructionsText);

            var glass = response.drinks[0].strGlass;
            var glassText = $("<p class='search-text'>").text("Glassware: " + glass);
            searchDiv.append(glassText);

            // List each of the drinks displayed above.
            // $("#search-parameter").html("<p id='pstyle'>" + "Quiz Results for: '" + cocktailSearch + "'" + "</p>");
            $(".cocktail-results").append(searchImage);
            $(".cocktail-results").append(searchDiv);
        };

        // Reset the variable nextID.
        var nextID = 0;

        if (lookupIndex < lookup.length) {
            nextID = lookup[lookupIndex];
            lookupIndex++;
        }

        if (nextID > 0) {
            $.ajax({
                url: idURL + nextID,
                method: "GET"
            }).then(getID);

        } else {
            // All done!
        }
    }

    $("#SubmitButton").on("click", function (event) {
        event.preventDefault();

        var cocktailSearch = $("#SearchField").val();

        var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailSearch;

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function (response) {
            $(".cocktail-results").empty();
            $(".cocktail-image").empty();

            for (i = 0; i < response.drinks.length && i < maxResults; i++) {
                var searchImage = $("<div class='search-image'>");
                var imgURL = response.drinks[i].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL).attr("height", "125px").attr("width", "125px");
                searchImage.append(image);

                var searchDiv = $("<div class='cocktail-search'>");
                var name = response.drinks[i].strDrink;
                var nameText = $("<p class='search-text'>").text("Cocktail Name: " + name).css("font-weight", "bold");
                searchDiv.append(nameText);

                var category = response.drinks[i].strCategory;
                var categoryText = $("<p class='search-text'>").text("Category: " + category);
                searchDiv.append(categoryText);

                var ingredients = [response.drinks[i].strIngredient1 + ", " + response.drinks[i].strIngredient2 + ", " + response.drinks[i].strIngredient4 + ", " + response.drinks[i].strIngredient4];
                var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + ingredients);
                searchDiv.append(ingredientsText);

                var instructions = response.drinks[i].strInstructions;
                var instructionsText = $("<p class='search-text'>").text("Instructions: " + instructions);
                searchDiv.append(instructionsText);

                var glass = response.drinks[i].strGlass;
                var glassText = $("<p class='search-text'>").text("Glassware: " + glass);
                searchDiv.append(glassText);

                // List each of the drinks displayed above.
                $("#search-parameter").html("<p id='pstyle'>" + "Search Results for: '" + cocktailSearch + "'" + "</p>");
                $(".cocktail-results").append(searchImage);
                $(".cocktail-results").append(searchDiv);
                $("#SearchField").val("");
            }
        });
    })

    // function quiz() {
    //     liquor = [""];
    //     // var userChoice = $()
    //     liquor.push(userChoice);
    // }

    getLiquor();

})
