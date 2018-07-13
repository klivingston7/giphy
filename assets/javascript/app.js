
var actors = ["Zach Galifianakis", "Jim Carrey", "Will Ferrell", "Adam Sandler", "Robin Williams", "Bill Murray", "Paul Rudd", "Chris Farley", "Jason Sudeikis", "Jimmy Fallon"]


// re-renders the HTML to display the appropriate content
function displayGIFs() {

    var actor = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GZ27bB5Xilh5relQucKNnNGwWTjdQyo5&q=" +
        actor + "&limit=10&offset=0&rating=PG-13&lang=en";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {

            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='actor'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    
                    var p = $("<p>").text("Rating: ");

                    var p2 = $("<p>").text(" " + rating);
                    p2.addClass("rating")
                    p2.attr("style", "text-transform: uppercase");

                    // Creating an image tag
                    var actorImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the result item
                    actorImage.addClass("gif")
                    actorImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(actorImage);
                    p.append(p2);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#actors").prepend(gifDiv);
                }
            }
        });
};

function origButtons() {

    $("#actorButtons").empty();

    for (var i = 0; i < actors.length; i++) {

        var a = $("<button>");
        // Adding a class
        a.addClass("btn btn-light actor-btn");
        // Adding a data-attribute with a value of the actor at index i
        a.attr("data-name", actors[i]);
        // Providing the button's text with a value of the actor at index i
        a.text(actors[i]);
        // Adding the button to the HTML
        $("#actorButtons").append(a);
    }
}

function renderButtons() {

    $("#actorButtons").empty();

    // Looping through the array of actors
    for (var i = 0; i < actors.length; i++) {
        actors[i] = actors[i].charAt(0).toUpperCase() + actors[i].substr(1);
        // Then dynamicaly generating buttons for each actor in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("btn btn-light actor-btn");
        // Adding a data-attribute with a value of the actor at index i
        a.attr("data-name", actors[i]);
        // Providing the button's text with a value of the actor at index i
        a.text(actors[i]);
        // Adding the button to the HTML
        $("#actorButtons").append(a);
    }

    origButtons();
}

// This function handles events where one button is clicked
$("#add-actor").on("click", function (event) {

    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var actor = $("#actor-input").val().trim();

    // Adding the actor from the textbox to our array
    actors.push(actor);

    // Calling renderButtons which handles the processing of our actor array
    renderButtons();

});

// Adding a click event listener to all elements with a class of "actor-btn"
$(document).on("click", ".actor-btn", displayGIFs);

origButtons();