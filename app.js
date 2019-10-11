$(document).ready(function () {

    var liquor = ["bourbon"];
    var lookup = ["11021"];
    var liquorURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + liquor;
    var idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + lookup;

    // AJAX call to gather liquor information
    $.ajax({
        url: liquorURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);

        for (i = 0; i < response.drinks.length; i++) {
            // console.log(response.drinks[i]);

            console.log("Cocktail Name: " + response.drinks[i].strDrink);
            console.log("ID: " + response.drinks[i].idDrink);
        };
    });

    // AJAX call to gather ID information
    $.ajax({
        url: idURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < lookup.length; i++) {
            console.log("ID: " + response.drinks[0].idDrink);
            console.log("Cocktail Name: " + response.drinks[0].strDrink);
            console.log("Ingredients: " + response.drinks[0].strIngredient1 + ", " + response.drinks[0].strIngredient2 + ", " + response.drinks[0].strIngredient4 + ", " + response.drinks[0].strIngredient4);

            var idDiv = $("<div class='id'>");
            
            var name = response.drinks[i].strDrink;
            var nameText = $("<p>").text("Cocktail Name: " + name);
            idDiv.append(nameText);

            var ingredients = [response.drinks[0].strIngredient1 + ", " + response.drinks[0].strIngredient2 + ", " + response.drinks[0].strIngredient4 + ", " + response.drinks[0].strIngredient4];
            var ingredientsText = $("<p>").text("Ingredients: " + ingredients);
            idDiv.append(ingredientsText);

            var glass = response.drinks[i].strGlass;
            var glassText = $("<p>").text("Normally contained in a: " + glass);
            idDiv.append(glassText);

            var idImage = $("<div class='id-image'>");
            var imgURL = response.drinks[i].strDrinkThumb;
            var image = $("<img>").attr("src", imgURL).attr("height", "100px").attr("width", "100px");
            idImage.append(image);

            // List each of the drinks displayed above.
            $(".quiz-results").append(idDiv);
            $(".quiz-image").append(idImage);
        }
    });

    function quiz() {
        liquor = [""];
        liquor.push(answer);
    }

});