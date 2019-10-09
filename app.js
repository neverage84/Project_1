$(document).ready(function () {

var yourPostalCode = "98107";
// may need to do postal code, city is not specific enough (i.e. fremont isn't recognized, but seattle is)
// NEED GEOLOCATION API IN ORDER TO GET THE ZIP CODE 
var breweryCity = "seattle"; //assuming this is the user's input 
//var breweryState = "washington";

function displayBreweries() {

    var queryURL = "https://api.openbrewerydb.org/breweries?" + "&by_city=" + breweryCity;

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
}

displayBreweries();

});