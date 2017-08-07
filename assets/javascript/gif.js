
// $(document).ready(function(){

// global variables 
var apiKey = "717ce6f132b54cedb89f385496df6b8d";


// array for button
var bBall = ["Lebron James", "Stephen Curry", "Chris Webber", "Carmelo Anthony", "Russell Westbrook", "Jimmy Butler", "Damion Lillard", "Kevin Durant", "John Wall", "Michael Carter-Williams","Kawhi Leonard", "Isiah Thomas", "James Harden", "Dwight Howard", "Paul Millsap", "Paul Gasol", "Marc Gasol", "Bradley Beal", "Draymond Green", "Kyrie Irving"]
// create button from array

function button(){

	$("#ballButton").empty();

	for (var i =0 ; i < bBall.length; i++) {

		var athleteButton = $("<button>");

		athleteButton.attr("data-name", bBall[i]);
		
		athleteButton.text(bBall[i]);


		$("#ballButton").append(athleteButton);
	}

}


// add new buttons to the page

$("#addAthlete").on("click", function(event) {

	event.preventDefault();

	var newPlayer = $("#newName").val().trim();

	bBall.push(newPlayer);

	button();

});



// ajax

function getImage() {

	var player = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=717ce6f132b54cedb89f385496df6b8d&q=" + player +  "&limit=10&offset=0&rating=PG&lang=en"

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response){
		console.log(response)

		var results = response.data;

		$("#athlete").empty();

		for (var i = 0; i < results.length; i++) {
		
			var playerDiv = $("<div>");
			playerDiv.addClass("image");

			var p = $("<p>").text("Rating: " + results[i].rating);

			var playerImage = $("<img class'gif'>");

			playerImage.attr("src", results[i].images.fixed_height_still.url);
			playerImage.attr("data-still", results[i].images.fixed_height_still.url);
			playerImage.attr("data-animate", results[i].images.fixed_height.url);
			playerImage.attr("data-state", "still");

			playerDiv.append(p);
			playerDiv.append(playerImage); 
	
			$("#athlete").prepend(playerDiv);
		}
			
	});
};

function move() {
	// $(".gif").on("click", function(){

		var state = $(this).attr("data-state");

		if (state === "still") {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
      } else {
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
        }
    // })
}





$(document).on("click", "button", getImage);

$(document).on("click", "img", move);


button();

// })s



