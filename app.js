<<<<<<< HEAD
$(document).ready(function () {

    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 47.608, lng: -122.330 },
            zoom: 13,
            mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('SearchField');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls.push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
        
    }



    // $("#SubmitButton").on("click", function (event) {
    //     event.preventDefault();
    //     var map;
    //     var service;
    //     var infowindow;

    //     function initMap() {
    //         var seattle = new google.maps.LatLng(47.608, -122.330);

    //         infowindow = new google.maps.InfoWindow();

    //         map = new google.maps.Map(
    //             document.getElementById('map'), { center: seattle, zoom: 15 });

    //         var searchInput = $("#SearchField").val().trim().toLowerCase();
    //         var request = {
    //             query: searchInput,
    //             fields: ['name', 'geometry'],
    //         };
    //         console.log(searchInput)

    //         var service = new google.maps.places.PlacesService(map);

    //         service.findPlaceFromQuery(request, function (results, status) {
    //             if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                 for (var i = 0; i < results.length; i++) {
    //                     createMarker(results[i]);
    //                 }
    //                 map.setCenter(results[0].geometry.location);
    //             }
    //         });
    //     }
    //     initMap()

    // });

});
=======
var liquor = ["bourbon"];
var lookup = [];
var lookupIndex = 0;
var maxResults = 3;
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
            // console.log(response.drinks[i]);

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

        var idDiv = $("<div class='id'>");

        var name = response.drinks[0].strDrink;
        var nameText = $("<p>").text("Cocktail Name: " + name);
        idDiv.append(nameText);

        var ingredients = [response.drinks[0].strIngredient1 + ", " + response.drinks[0].strIngredient2 + ", " + response.drinks[0].strIngredient4 + ", " + response.drinks[0].strIngredient4];
        var ingredientsText = $("<p>").text("Ingredients: " + ingredients);
        idDiv.append(ingredientsText);

        var glass = response.drinks[0].strGlass;
        var glassText = $("<p>").text("Normally contained in a: " + glass);
        idDiv.append(glassText);

        var idImage = $("<div class='id-image'>");
        var imgURL = response.drinks[0].strDrinkThumb;
        var image = $("<img>").attr("src", imgURL).attr("height", "100px").attr("width", "100px");
        idImage.append(image);

        // List each of the drinks displayed above.
        $(".quiz-results").append(idDiv);
        $(".quiz-image").append(idImage);
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

// function quiz() {
//     liquor = [""];
//     liquor.push(answer);
// }

$(document).ready(getLiquor);
>>>>>>> b97e0786e8518adbe60033f2bd9c498651f60cb6
