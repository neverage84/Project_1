$(document).ready(function () {

    var liquor = ["bourbon"];
    var lookup = [];
    var lookupIndex = 0;
    var maxResults = 2;  // Set this limit when ready for go live.
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

            var searchImage = $("<div class='id-image'>");
            var imgURL = response.drinks[0].strDrinkThumb;
            var image = $("<img>").attr("src", imgURL).attr("height", "100px").attr("width", "100px");
            searchImage.append(image);

            var searchDiv = $("<div class='cocktail-search'>");
            var name = response.drinks[0].strDrink;
            var nameText = $("<p class='search-text'>").text("Cocktail Name: " + name);
            searchDiv.append(nameText);

            var ingredients = [response.drinks[0].strIngredient1 + ", " + response.drinks[0].strIngredient2 + ", " + response.drinks[0].strIngredient4 + ", " + response.drinks[0].strIngredient4];
            var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + ingredients);
            searchDiv.append(ingredientsText);

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

    $("#search-submit").on("click", function (event) {
        event.preventDefault();

        var cocktailSearch = $("#search-input").val();

        var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailSearch;

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function (response) {
            $(".cocktail-results").empty();
            $(".cocktail-image").empty();

            for (i = 0; i < response.drinks.length && i < maxResults; i++) {
                var searchDiv = $("<div class='cocktail-search'>");

                var name = response.drinks[i].strDrink;
                var nameText = $("<p class='search-text'>").text("Cocktail Name: " + name);
                searchDiv.append(nameText);

                var ingredients = [response.drinks[i].strIngredient1 + ", " + response.drinks[i].strIngredient2 + ", " + response.drinks[i].strIngredient4 + ", " + response.drinks[i].strIngredient4];
                var ingredientsText = $("<p class='search-text'>").text("Ingredients: " + ingredients);
                searchDiv.append(ingredientsText);

                var glass = response.drinks[i].strGlass;
                var glassText = $("<p class='search-text'>").text("Glassware: " + glass);
                searchDiv.append(glassText);

                var searchImage = $("<div class='id-image'>");
                var imgURL = response.drinks[i].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL).attr("height", "100px").attr("width", "100px");
                searchImage.append(image);

                // List each of the drinks displayed above.
                $(".cocktail-results").append(searchImage)
                $(".cocktail-results").append(searchDiv);
                $("#search-input").val("");
            }
        });
    })

    // function quiz() {
    //     liquor = [""];
    //     liquor.push(answer);
    // }

    getLiquor();
})