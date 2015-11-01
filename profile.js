var https = require("https");
var http = require("http");

function get(username) {

  // Define function to display badges and points
  function printMessage(username, badges, points) {
    var message = username + " has " + badges + " badges and " + points + " points in JavaScript.";
    console.log(message);
  }

  // Print errors messages
  function printError(error) {
    console.error(error.message);
  }

  // Access the API
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    // Concatenate all chunks into single variable
    var body = "";
    response.on('data', function(chunk) {
      body += chunk;
    });

    // Wait until all chunks loaded before executing code
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
          // Parse the string into JSON
          var profile = JSON.parse(body);
          // Print the results
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          // Parse error
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the profile for "
        + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });

  });

  // Handle error messages
  request.on("error", printError);

};

module.exports.get = get;
