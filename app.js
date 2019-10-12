$(document).ready(function() {
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
            radius: "300",
            type: ["bar"]
          };
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
        }
        function createMarker(place) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          console.log(place)
          google.maps.event.addListener(marker, "click", function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }
        function createMarkerSelf(){
            var marker = new google.maps.Marker({
                position: currentLocation,
                map: map
              });
          }
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              console.log(results);
              var place = results[i];
              createMarker(results[i]);
              createMarkerSelf();
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

$("#SubmitButton").on("click", function(event) {
  event.preventDefault();
  $.ajax("http://ip-api.com/json").then(
      function success(response) {
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
    console.log(place)
    google.maps.event.addListener(marker, "click", function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    
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
  function createMarkerSelf(){
    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map
      });
  }
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
        createMarkerSelf();
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

var liquor = ["bourbon"];
var lookup = [];
var lookupIndex = 0;
var maxResults = 3;
var liquorURL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor;
var idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function getLiquor() {
  // AJAX call to gather liquor information
  $.ajax({
    url: liquorURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);

    for (i = 0; i < response.drinks.length && i < maxResults; i++) {
      // console.log(response.drinks[i]);

      console.log("Cocktail Name: " + response.drinks[i].strDrink);
      console.log("ID: " + response.drinks[i].idDrink);
      lookup.push(response.drinks[i].idDrink);
      console.log(lookup);
    }
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

    var ingredients = [
      response.drinks[0].strIngredient1 +
        ", " +
        response.drinks[0].strIngredient2 +
        ", " +
        response.drinks[0].strIngredient4 +
        ", " +
        response.drinks[0].strIngredient4
    ];
    var ingredientsText = $("<p>").text("Ingredients: " + ingredients);
    idDiv.append(ingredientsText);

    var glass = response.drinks[0].strGlass;
    var glassText = $("<p>").text("Normally contained in a: " + glass);
    idDiv.append(glassText);

    var idImage = $("<div class='id-image'>");
    var imgURL = response.drinks[0].strDrinkThumb;
    var image = $("<img>")
      .attr("src", imgURL)
      .attr("height", "100px")
      .attr("width", "100px");
    idImage.append(image);

    // List each of the drinks displayed above.
    $(".quiz-results").append(idDiv);
    $(".quiz-image").append(idImage);
  }

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
