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
            var imgURL = response.drinks[i].strDrinkThumb;
            var image = $("<img>").attr("src", imgURL).attr("height", "100px").attr("width", "100px");
            idDiv.append(image);

            var name = response.drinks[i].strDrink;
            var nameText = $("<p>").text("Cocktail Name: " + name);
            idDiv.append(nameText);

            // List each of the shows displayed above.
            $(".quiz-results").prepend(idDiv);
        }
    });

    function quiz() {
        liquor = [""];
        liquor.push(answer);
    }



    // var showDiv = $("<div class='show'>");

    // // Store each of the images in its state (animated or still).
    // var imgURL = response.data[i].images.fixed_height_still.url;
    // var stillURL = response.data[i].images.fixed_height_still.url;
    // var animatedURL = response.data[i].images.fixed_height.url;
    // var image = $("<img>").attr("src", imgURL).attr("class", "gifs").attr("state", "still").attr("clicked-image", animatedURL).attr("still-image", stillURL);
    // showDiv.append(image);

    // // Store and display the rating data.
    // var rating = response.data[i].rating;
    // var ratingText = $("<p>").text("Rating: " + rating.toUpperCase());
    // showDiv.append(ratingText);

    // // List each of the shows displayed above.
    // $("#show-view").prepend(showDiv);

    // // Transfer content to HTML
    // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    // $(".wind").text("Wind Speed: " + response.wind.speed);
    // $(".humidity").text("Humidity: " + response.main.humidity);
    // $(".temp").text("Temperature (F) " + response.main.temp);

    // // Log the data in the console as well
    // console.log("Wind Speed: " + response.wind.speed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + response.main.temp);
});