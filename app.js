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