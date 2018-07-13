
var actors = ["Zach Galifianakis", "Jim Carrey", "Will Ferrell", "Adam Sandler", "Robin Williams", "Bill Murray", "Paul Rudd", "Chris Farley", "Jason Sudeikis", "Jimmy Fallon"]


// re-renders the HTML to display the appropriate content
function displayGIFs() {

    var actor = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GZ27bB5Xilh5relQucKNnNGwWTjdQyo5&q=" +
        actor + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div class='actor'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: ");

                    var p2 = $("<p>").text(" " + rating);
                    p2.addClass("rating")
                    p2.attr("style", "text-transform: uppercase");

                    var actorImage = $("<img>");

                    actorImage.addClass("gif")
                    actorImage.attr("src", results[i].images.fixed_height_still.url);

                    var imageDiv = $("<div>");
                    imageDiv.addClass("run");
                    imageDiv.attr("data-name", actor);
                    imageDiv.attr("data-state", "still");
                    imageDiv.attr("data-animate", results[i].images.fixed_height.url)
                    imageDiv.attr("data-still", results[i].images.fixed_height_still.url);

                    $(imageDiv).append(actorImage);
                    $(gifDiv).append(imageDiv);
                    gifDiv.prepend(p);
                    p.append(p2);
                    $("#actors").prepend(gifDiv);
                }
            }
        });
};

function origButtons() {

    $("#actorButtons").empty();

    for (var i = 0; i < actors.length; i++) {

        var a = $("<button>");

        a.addClass("btn btn-light actor-btn");
        a.attr("data-name", actors[i]);
        a.text(actors[i]);
        $("#actorButtons").append(a);
    }
}

function renderButtons() {

    $("#actorButtons").empty();

    // Looping through the array of actors
    for (var i = 0; i < actors.length; i++) {
        actors[i] = actors[i].charAt(0).toUpperCase() + actors[i].substr(1);

        var a = $("<button>");

        a.addClass("btn btn-light actor-btn");
        a.attr("data-name", actors[i]);
        a.text(actors[i]);
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

    actors.push(actor);

    renderButtons();
});

function gifState() {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};

// Adding a click event listener to all elements with a class of "actor-btn"
$(document).on("click", ".actor-btn", displayGIFs);
$(document).on("click", ".run", gifState);


origButtons();