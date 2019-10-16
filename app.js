
// ** BAR SEARCH CODE **

$(document).ready(function () {

    // Global Map Variables
    var latitude;
    var longitude;
    var currentLocation;
    var map;
    var service;
    var infowindow = new google.maps.InfoWindow();
    var request;
    var marker;
    var maxResults = 3;

    // Gets the user location on page load and displays nearby bars
    window.onload = function () {
        var startPos;
        var geoSuccess = function (position) {
            startPos = position;
            // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
            // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
            console.log("Geoposition gives " + startPos.coords.latitude + " for latitutde");
            console.log("Geoposition gives " + startPos.coords.longitude + " for longitude");
            latitude = startPos.coords.latitude;
            longitude = startPos.coords.longitude;
            // $("#startLat").attr("style", "display: none;");
            // $("#startLon").attr("style", "display: none;");
            initialize();
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
    };

    // Function to display nearby nearby bars around user location
    function initialize() {
        console.log(latitude);
        console.log(longitude);
        currentLocation = new google.maps.LatLng(latitude, longitude);
        map = new google.maps.Map(document.getElementById("map"), {
            center: currentLocation,
            zoom: 15
        });
        request = {
            location: currentLocation,
            radius: "800",
            type: ["bar"],
            fields: ['name', 'formatted_address', 'place_id', 'geometry']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    // Creates a marker at returned place results and display place details
    function createMarker(place) {
        var detailsRequest = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'place_id', 'geometry', "formatted_phone_number", "opening_hours", "website"]
        };
        service.getDetails(detailsRequest, function (placeMarker, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                marker = new google.maps.Marker({
                    map: map,
                    position: placeMarker.geometry.location
                });
                // gets the current day of week
                var day = new Date();
                // converts day to an index number, subtracts 1 to match the same index number as Google's API
                var dayIndex = day.getDay() - 1;
                // if statement to set an index of -1 which would be Sunday, to 6 which is Sunday in Google's API
                if (dayIndex === -1) {
                    dayIndex = 6
                }
                console.log(placeMarker)
                google.maps.event.addListener(marker, 'click', function () {
                    var br = "<br>"
                    infowindow.setContent('<div><strong>' + placeMarker.name + '</strong>' + br +
                        placeMarker.formatted_address + br + placeMarker.formatted_phone_number + br +
                        placeMarker.website + br + placeMarker.opening_hours.weekday_text[dayIndex] + '</div>');
                    infowindow.open(map, this);
                });
            }
        });
    }

    // Creates a marker at user location
    function createMarkerSelf() {
        marker = new google.maps.Marker({
            position: currentLocation,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
    }

    // Callback function to return place results and display them as markers on the map
    function callback(results, status) {
        createMarkerSelf();
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);
            }
        }
    }

    $("#SubmitButton").on("click", function (event) {
        event.preventDefault();
        if ($("#barOption").is(":checked")) {

            // Function to take the user search input and display results on the map
            function initializeSearch() {
                currentLocation = new google.maps.LatLng(latitude, longitude);
                map = new google.maps.Map(document.getElementById("map"), {
                    center: currentLocation,
                    zoom: 13
                });
                var searchInput = $("#SearchField")
                    .val()
                    .trim()
                    .toLowerCase();

                request = {
                    location: currentLocation,
                    radius: "400",
                    query: searchInput + " cocktail"
                };
                service = new google.maps.places.PlacesService(map);
                service.textSearch(request, callback);
            }
            initializeSearch();
            $("#SearchField").val("");
        } else if ($("#drinkOption").is(":checked")) {
            var cocktailSearch = $("#SearchField").val();

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

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
                    var nameText = $("<p class='search-text-name'>").text("Cocktail Name: " + name).css("font-weight", "bold");
                    searchDiv.append(nameText);

                    var star = $("<span class='fa-star far'>" + "</span>").attr("state", "unfilled").attr("name", name);
                    searchDiv.append(star);

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
        }

    });



































    // ** COCKTAIL SEARCH CODE **

    $(document).ready(function () {

        var liquor = ["bourbon"];
        var lookup = [];
        var lookupIndex = 0;
        var maxResults = 3;  // Set this limit when ready for go live.
        var liquorURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor;
        var idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
        var favoritesList = [];

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
                var nameText = $("<p class='search-text-name'>").text("Cocktail Name: " + name).css("font-weight", "bold");
                searchDiv.append(nameText);

                var star = $("<span class='fa-star far'>" + "</span>").attr("state", "unfilled").attr("name", name);
                searchDiv.append(star);

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

        // Create a way to mark a drink as a favorite if clicked.
        function favorites() {
            console.log("testing favorites");

            var currentState = $(this).attr("state");

            if (currentState == "unfilled") {
                $(this).attr("state", "filled").removeClass("far").addClass("fas");
                var favoriteDrink = $(this).attr("name");
                favoritesList.push(favoriteDrink);
                localStorage.setItem("list", favoritesList);
                // document.getElementById("favorites").innerHTML = "<p>" + favoritesList.join("<br>") + "</p>";
                document.getElementById("favorites").innerHTML = localStorage.getItem("list");
            }

            else if (currentState == "filled") {
                $(this).attr("state", "unfilled").removeClass("fas").addClass("far");
                var favoriteDrink = $(this).attr("name");
                var removeDrink = favoritesList.indexOf(favoriteDrink);
                if (removeDrink != -1) {
                    favoritesList.splice(removeDrink, 1);
                }
                localStorage.setItem("list", favoritesList);
                // document.getElementById("favorites").innerHTML = "<p>" + favoritesList.join("<br>") + "</p>";
                document.getElementById("favorites").innerHTML = localStorage.getItem("list");
                console.log(favoritesList);
            }
        }

        // function quiz() {
        //     liquor = [""];
        //     // var userChoice = $()
        //     liquor.push(userChoice);
        // }

        getLiquor();
        $(document).on("click", ".fa-star", favorites);
    })





});
