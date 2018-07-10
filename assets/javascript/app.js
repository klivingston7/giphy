
var movies = [];

// re-renders the HTML to display the appropriate content
function displayGIFs() {
  
  var movie = $(this).attr("data-name");
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GZ27bB5Xilh5relQucKNnNGwWTjdQyo5&q=" +
  movie + "&limit=10&offset=0&rating=PG-13&lang=en";
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {

        // Storing an array of results in the results variable
        var results = response.data;
  
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
  
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='movie'>");
    
                // Storing the result item's rating
                var rating = results[i].rating;
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
    
                // Creating an image tag
                var movieImage = $("<img>");
    
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                movieImage.attr("src", results[i].images.fixed_height.url);
    
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(movieImage);
    
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#movies").prepend(gifDiv);
            }
         }
     });
 };

function renderButtons() {

    $("#movieButtons").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("movie-btn");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", movies[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#movieButtons").append(a);
    }

}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
    
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding the movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

 });

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayGIFs);

