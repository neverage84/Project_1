
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
    var maxResults = 5;
    var LiquorType;

    //Global Fun Facts Variables
    var IntervalID;
    var count = -1;
    var FunFactsArr = ["There exists a cocktail called a Ramboozle, popular in England in the mid 17th century.",
        " Ernest Hemingway invented a cocktail named “Absinthe and Champagne” or, “Death in the Afternoon.",
        "There’s an International Bartenders Association which sanctions an official cocktail list for use in the World Cocktail Competition.",
        "There is a cocktail known as a “Sully,” named after the pilot of US Airways Flight 1549, which consists of two shots of Grey Goose and a splash of water.",
        "The “wake-up juice” in Back to the Future 3 is a real cocktail.",
        " A “Rich Dead Nazi” is actually a cocktail made of Goldschläger, Jägermeister, and peppermint schnapps. ",
        "In Utah, bartenders in restaurants have to mix cocktails behind a curtain.",
        "The Caesar is a cocktail only popular in Canada. It is a mixture of vodka and Clamato (clam broth + tomato juice).",
        "The Brandy Daisy, a cocktail of citrus juice and brandy, was the forerunner of the Margarita. Margarita is the Spanish name for Daisy.",
        "The cocktail “screwdriver” origins from Persian Oil Workers in the 1920s. When lacking a spoon to stir, they used screwdrivers.",
        "A martini cocktail should be stirred, and a shaken martini is called a Bradford. This is why Bond always has to specify his martini be made the wrong way. ",
        "During prohibition, honey and fruit juices were heavily used to mask the poor quality of liquor.",
        "The “Toronto Cocktail” was first recorded in 1922, at a time when alcohol was illegal in Ontario.",
        "Cocktail glasses (tumblers) are thicker on the bottom so non-liquid ingredients can be “muddled” in the glass before liquids are added.",
        "Cocktail umbrella’s contained hidden scrolls of Chinese newspaper which can be read like fortune cookies.",
        "An attempt to set the Guinness World Record for the world’s most expensive cocktail was thwarted when a customer dropped and broke the bottle of Cognac that was worth $77,000.",
        "There was a real, radium-based, alcoholic drink known as the “Atomic Cocktail” that was served in missile shaped bottles.",
        "There exists a cocktail called a Ramboozle, popular in England in the mid 17th century.",
        " Ernest Hemingway invented a cocktail named “Absinthe and Champagne” or, “Death in the Afternoon.",
        "There’s an International Bartenders Association which sanctions an official cocktail list for use in the World Cocktail Competition.",
        "There is a cocktail known as a “Sully,” named after the pilot of US Airways Flight 1549, which consists of two shots of Grey Goose and a splash of water.",
        "The “wake-up juice” in Back to the Future 3 is a real cocktail.",
        " A “Rich Dead Nazi” is actually a cocktail made of Goldschläger, Jägermeister, and peppermint schnapps. ",
        "In Utah, bartenders in restaurants have to mix cocktails behind a curtain.",
        "The Caesar is a cocktail only popular in Canada. It is a mixture of vodka and Clamato (clam broth + tomato juice).",
        "The Brandy Daisy, a cocktail of citrus juice and brandy, was the forerunner of the Margarita. Margarita is the Spanish name for Daisy.",
        "The cocktail “screwdriver” origins from Persian Oil Workers in the 1920s. When lacking a spoon to stir, they used screwdrivers.",
        "A martini cocktail should be stirred, and a shaken martini is called a Bradford. This is why Bond always has to specify his martini be made the wrong way. ",
        "During prohibition, honey and fruit juices were heavily used to mask the poor quality of liquor.",
        "The “Toronto Cocktail” was first recorded in 1922, at a time when alcohol was illegal in Ontario.",
        "Cocktail glasses (tumblers) are thicker on the bottom so non-liquid ingredients can be “muddled” in the glass before liquids are added.",
        "Cocktail umbrella’s contained hidden scrolls of Chinese newspaper which can be read like fortune cookies.",
        "An attempt to set the Guinness World Record for the world’s most expensive cocktail was thwarted when a customer dropped and broke the bottle of Cognac that was worth $77,000.",
        "There was a real, radium-based, alcoholic drink known as the “Atomic Cocktail” that was served in missile shaped bottles.",
        "There exists a cocktail called a Ramboozle, popular in England in the mid 17th century.",
        " Ernest Hemingway invented a cocktail named “Absinthe and Champagne” or, “Death in the Afternoon.",
        "There’s an International Bartenders Association which sanctions an official cocktail list for use in the World Cocktail Competition.",
        "There is a cocktail known as a “Sully,” named after the pilot of US Airways Flight 1549, which consists of two shots of Grey Goose and a splash of water.",
        "The “wake-up juice” in Back to the Future 3 is a real cocktail.",
        " A “Rich Dead Nazi” is actually a cocktail made of Goldschläger, Jägermeister, and peppermint schnapps. ",
        "In Utah, bartenders in restaurants have to mix cocktails behind a curtain.",
        "The Caesar is a cocktail only popular in Canada. It is a mixture of vodka and Clamato (clam broth + tomato juice).",
        "The Brandy Daisy, a cocktail of citrus juice and brandy, was the forerunner of the Margarita. Margarita is the Spanish name for Daisy.",
        "The cocktail “screwdriver” origins from Persian Oil Workers in the 1920s. When lacking a spoon to stir, they used screwdrivers.",
        "A martini cocktail should be stirred, and a shaken martini is called a Bradford. This is why Bond always has to specify his martini be made the wrong way. ",
        "During prohibition, honey and fruit juices were heavily used to mask the poor quality of liquor.",
        "The “Toronto Cocktail” was first recorded in 1922, at a time when alcohol was illegal in Ontario.",
        "Cocktail glasses (tumblers) are thicker on the bottom so non-liquid ingredients can be “muddled” in the glass before liquids are added.",
        "Cocktail umbrella’s contained hidden scrolls of Chinese newspaper which can be read like fortune cookies.",
        "An attempt to set the Guinness World Record for the world’s most expensive cocktail was thwarted when a customer dropped and broke the bottle of Cognac that was worth $77,000.",
        "There was a real, radium-based, alcoholic drink known as the “Atomic Cocktail” that was served in missile shaped bottles."






    ];

    // Gets the user location on page load and displays nearby bars
    window.onload = function () {
        FunFacts();
        runFunFacts();
        var startPos;
        var geoSuccess = function (position) {
            startPos = position;
            console.log("Geoposition gives " + startPos.coords.latitude + " for latitutde");
            console.log("Geoposition gives " + startPos.coords.longitude + " for longitude");
            latitude = startPos.coords.latitude;
            longitude = startPos.coords.longitude;
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

    // Creates a marker at returned place results and displays place details
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
        if ($("#SearchField").val().length === 0) {
            console.log("Modal should open");
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 

            modal.style.display = "block";


            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
        else {
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
                drinkSearch(cocktailSearch);
            }
        }
    });

    //Fun Fact functions
    function runFunFacts() {
        IntervalID = setInterval(FunFacts, 30000);
    }
    function FunFacts() {
        count++;
        $("#FunFactsID").html("<h3>" + FunFactsArr[count] + "</h3>");


    }











    // function that takes a drink name as an input and searches the cocktail API for that drink name
    function drinkSearch(drinkName) {
        //master

        var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
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
                // checks to see if a drink has already been added to favorites
                var favoriteDrinkID = name.split(" ").join("-").replace("'", "");
                if ($("#favoritesContainer #" + favoriteDrinkID).length > 0) {
                    star.attr("state", "filled").attr("title", "Remove From Favorites").removeClass("far").addClass("fas");
                }
                searchDiv.append(star);

                var category = response.drinks[i].strCategory;
                var categoryText = $("<p class='search-text'>").text("Category: " + category);
                searchDiv.append(categoryText);

                var ingredients = [response.drinks[i].strIngredient1, response.drinks[i].strIngredient2, response.drinks[i].strIngredient3, response.drinks[i].strIngredient4, response.drinks[i].strIngredient5, response.drinks[i].strIngredient6];

                var allIngredients = [];

                for (j = 0; j < ingredients.length; j++) {
                    if (ingredients[j]) {
                        allIngredients.push(ingredients[j]);
                    }
                };

                allIngredients = allIngredients.join(", ");
                var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + allIngredients);
                searchDiv.append(ingredientsText);

                var instructions = response.drinks[i].strInstructions;
                var instructionsText = $("<p class='search-text'>").text("Instructions: " + instructions);
                searchDiv.append(instructionsText);

                var glass = response.drinks[i].strGlass;
                var glassText = $("<p class='search-text'>").text("Glassware: " + glass);
                searchDiv.append(glassText);

                // List each of the drinks displayed above.
                $("#search-parameter").html("<p id='pstyle'>" + "Search Results for: '" + drinkName + "'" + "</p>");
                $(".cocktail-results").append(searchImage);
                $(".cocktail-results").append(searchDiv);
                $("#SearchField").val("");
            }
        });
    }

    //Fun Fact functions
    function runFunFacts() {
        IntervalID = setInterval(FunFacts, 30000);
    }
    function FunFacts() {
        count++;
        $("#FunFactsID").html(FunFactsArr[count]);
    }


    // ** COCKTAIL SEARCH CODE **

    var lookup = [];
    var lookupIndex = 0;
    var maxResults = 5;  // Set this limit when ready for go live.
    var liquorURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + LiquorType;
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
            var name = response.drinks[0].strDrink
            var nameText = $("<p class='search-text-name'>").text("Cocktail Name: " + name).css("font-weight", "bold");
            searchDiv.append(nameText);
            console.log(name)
            var star = $("<span class='fa-star far' title='Add To Favorites'>" + "</span>").attr("state", "unfilled").attr("name", name);
            // checks to see if a drink has already been added to favorites
            var favoriteDrinkID = name.split(" ").join("-").replace("'", "");
            if ($("#favoritesContainer #" + favoriteDrinkID).length > 0) {
                star.attr("state", "filled").attr("title", "Remove From Favorites").removeClass("far").addClass("fas");
            }
            searchDiv.append(star);

            var category = response.drinks[0].strCategory;
            var categoryText = $("<p class='search-text'>").text("Category: " + category);
            searchDiv.append(categoryText);

            var ingredients = [response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6];

            var allIngredients = [];

            for (j = 0; j < ingredients.length; j++) {
                if (ingredients[j]) {
                    allIngredients.push(ingredients[j]);
                }
            };

            allIngredients = allIngredients.join(", ");
            var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + allIngredients);
            searchDiv.append(ingredientsText);

            var instructions = response.drinks[0].strInstructions;
            var instructionsText = $("<p class='search-text'>").text("Instructions: " + instructions);
            searchDiv.append(instructionsText);

            var glass = response.drinks[0].strGlass;
            var glassText = $("<p class='search-text'>").text("Glassware: " + glass);
            searchDiv.append(glassText);

            // List each of the drinks displayed above.
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
        var favoritesContainer = $("#favoritesContainer");
        var currentState = $(this).attr("state");
        var favoriteDrink = $(this).attr("name");
        var formattedFavoriteDrinkID = favoriteDrink.split(" ").join("-").replace("'", "");
        if (currentState == "unfilled") {
            $(this).attr("state", "filled").attr("title", "Remove From Favorites").removeClass("far").addClass("fas")
            var newDiv = $("<div id='" + formattedFavoriteDrinkID + "'>");
            var newButton = $('<button type="button" class="btn btn-light my-1 favorite-button">')
            newButton.text(favoriteDrink);
            newDiv.append(newButton)
            favoritesContainer.append(newDiv);
            localStorage.setItem("favorites", favoritesContainer.html());
        }
        else if (currentState == "filled") {
            $(this).attr("state", "unfilled").attr("title", "Add To Favorites").removeClass("fas").addClass("far");
            if (favoritesContainer.has("#" + formattedFavoriteDrinkID).length) {
                $("#" + formattedFavoriteDrinkID).remove();
            }
            localStorage.setItem("favorites", favoritesContainer.html());
        }
    }

    function quizReults() {
        console.log("test");


    }
    $(document).on("click", ".fa-star", favorites);
    $(document).on("click", ".sv_complete_btn", getLiquor);
    $("#favoritesContainer").html(localStorage.getItem("favorites")); // displays favorites container stored in local storage on page load

    // function to search for a favorited drink when clicked
    $(document).on("click", ".favorite-button", function () {
        var favoriteButtonText = $(this).text();
        drinkSearch(favoriteButtonText);
    });
});

//Survey.JS
Survey
    .StylesManager
    .applyTheme("default");

var json = {
    title: "Find your next cocktail",

    pages: [
        {
            title: "Which of these liquors do you prefer?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Liquor",
                    title: "Liquor Type",
                    hasOther: false,
                    isRequired: true,
                    choices: ["Vodka", "Gin", "Rum", "Bourbon", "Whiskey", "Scotch"]
                }
            ]
        },
        {
            title: "Which of these drinks do you typically go for?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Drinks",
                    title: "Drink Choices",
                    hasOther: false,
                    isRequired: true,
                    choices: ["The stronger the better", "Something Fruity", "Smooth but dry", "Bitter but great", "Sour or Tart", "Something simple - alcohol plus 1 or 2 ingredients"]
                }
            ]
        },

        {
            title: "Which of these appetizers would you order?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Appetizers",
                    title: "So tasty",
                    colCount: 3,
                    isRequired: true,
                    choices: [
                        "Buffalo Wings",
                        "Spinach Artichoke Dip",
                        "Mozzerella Sticks",
                        "Poke",
                        "Nachos",
                        "Light salad",
                        "I'll wait for the entree",


                    ]
                }
            ]
        }, {
            title: "After a long stressful day, which one sounds like you?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Stress",
                    title: "Recovery time",
                    isRequired: true,
                    choices: [
                        "Gonna squeeze in a nap",
                        "What's on netflix tonight?",
                        "Which friend can I vent to?",
                        "I need a drink",
                        "Gym time",



                    ]
                }
            ]
        }, {
            title: "What kind of person are you at a party?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Party",
                    title: "What's your personality?",
                    isRequired: true,
                    choices: [
                        "Life of the party - I've got stories for days!",
                        "I'm wherever the dance floor is",
                        "I chime in with a clever comment and pick my moments",
                        "Someone is usually crying on my shoulder",
                        "Quietly waiting to make my exit",

                    ]
                }
            ]
        }, {
            title: "Where's the best place to relax?",
            questions: [
                {
                    type: "radiogroup",
                    name: "Relax",
                    title: "Kumbaya",
                    isRequired: true,
                    choices: [
                        "Tropical beach with a sunset",
                        "Cabin in the forest",
                        "My own home is best place on earth",
                        "Drifting aimlessly on a boat",
                        "Around people I'm comfortable with",

                    ]
                }
            ]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        LiquorType = result.data.Liquor
        alert(LiquorType)

        if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Tropical beach with a sunset") {
            document

            $("#surveyElement").hide()
            $("#IMGID").html("<img src=images/drinks/MaiTai.jpeg>" + "<br>" + "<br>" + "<h2> Mai Tai </h2>")

        }
        else if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Around people I'm comfortable with") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/daiquiri.jpeg>" + "<br>" + "<br>" + "<h2> Daiquiri </h2>")

        }
        else if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Cabin in the forest") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/MalibuSunset.jpeg>" + "<br>" + "<br>" + "<h2> Malibu Sunset </h2>")

        }
        else if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Drifting aimlessly on a boat") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/TequilaSunrise.jpeg>" + "<br>" + "<br>" + "<h2> Tequila Sunrise</h2>")

        }
        else if (result.data.Drinks === "Smooth but dry" && result.data.Stress === "Gonna squeeze in a nap") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/OldFashioned.jpeg>" + "<br>" + "<br>" + "<h2> Old Fashioned</h2>")

        }
        else if (result.data.Liquor === "Scotch") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/OldFashioned.jpeg>" + "<br>" + "<br>" + "<h2> Old Fashioned</h2>")

        }
        else if (result.data.Drinks === "The stronger the better" && result.data.Liquor === "Bourbon") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/OldFashioned.jpeg>" + "<br>" + "<br>" + "<h2> Old Fashioned</h2>")

        }

        else if (result.data.Drinks === "Bitter but great" && result.data.Liquor === "Bourbon") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/Martinez.jpeg>" + "<br>" + "<br>" + "<h2> Martinez</h2>")

        }
        else if (result.data.Liquor === "Bourbon" && result.data.Drinks === "Something simple - alcohol plus 1 or 2 ingredients") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/Manhattan.jpeg>" + "<br>" + "<br>" + "<h2> Manhattan</h2>")

        }
        else if (result.data.Liquor === "Bourbon" && result.data.Drinks === "Smooth but dry") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/Brooklyn.jpeg>" + "<br>" + "<br>" + "<h2>Brooklyn</h2>")

        }
        else if (result.data.Drinks === "Sour or Tart" && result.data.Relax === "Around people I'm comfortable with") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/margarita.jpeg>" + "<br>" + "<br>" + "<h2> Margarita </h2>")

        }
        else if (result.data.Drinks === "Sour or Tart" && result.data.Relax === "Drifting aimlessly on a boat") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/Sidecar.jpeg>" + "<br>" + "<br>" + "<h2> Sidecar </h2>")

        }
        else if (result.data.Drinks === "Sour or Tart" && result.data.Relax === "Cabin in the forest") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/piscoSour.jpeg>" + "<br>" + "<br>" + "<h2> Pisco Sour </h2>")

        }
        else if (result.data.Drinks === "Sour or Tart" && result.data.Relax === "Tropical beach with a sunset") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/JackRose.jpeg>" + "<br>" + "<br>" + "<h2> Jack Rose </h2>")

        }
        else if (result.data.Drinks === "Sour or Tart" && result.data.Relax === "My own home is best place on earth") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/WhiskeySour.jpeg>" + "<br>" + "<br>" + "<h2> Whiskey Sour </h2>")

        }
        else if (result.data.Drinks === "Something simple - alcohol plus 1 or 2 ingredients" && result.data.Liquor === "Whiskey") {
            document

            $("#surveyElement").hide()

            $("#IMGID").html("<img src=images/drinks/WhiskeySour.jpeg>" + "<br>" + "<br>" + "<h2> Whiskey Sour </h2>")

        }
        else {
            document
            $("#surveyElement").hide()
            $("#IMGID").html("<img src=images/drinks/LongIslandIceTea.jpeg>" + "<br>" + "<br>" + "<h2> Long Island Ice Tea </h2>");
        }
        LiquorType = result.data.Liquor;
        console.log("Survey Result: " + LiquorType);
    });

survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({ model: survey });



