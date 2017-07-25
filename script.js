/*
This example will search MusixMatch for song titles with the word "salad", (or whatever search word a user types in)
And then populate the result on the page using jQuery
*/
var app = {
	//Define the url for the wikipedia API call
	musixMatchURL: "http://api.musixmatch.com/ws/1.1/track.search?q_track=",
	//currentWord: "salad",
	musixMatchRest:"&page_size=10&page=1&s_track_rating=desc",
	musixMatchKey:"&apikey=d919d8d046718bd5469b63e886f873cc",


	//Define an intial search term
	
	//A place to set up listeners or kick off an initial function
	initialize: function() {
		$("#search").click(function() {
  		console.log("Clicked search");
  		//clear the div
  		$("#resultsTarget").html("");
  		//Use jQuery to get the value of the 'query' input box
		var newCurrentWord = $("#query").val();
		console.log(newCurrentWord);
		//Execute the MusixMatch API call function with the currentWord var as the argument
		app.searchMusixMatch(app.newCurrentWord);
});
		//What if someone just wants to click "ENTER"?
		//Use jQuery to assign a callback function when enter is pressed 
		//This will ONLY work when the 'query' input box is active
		$("#query").keypress(function(e){
			//console.log(e);
			//If enter key is pressed
			if (e.which == 13){
				//Use jQuery's trigger() function to execute the click event
				$("#search").trigger('click');
			}
		});
	},
	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	searchMusixMatch: function(searchTerm) {
		console.log("Executing the searchMusixMatch function");
		/*
		Use jQuery's ajax method to get the data

		The jQuery ajax method can accept an object as its argument
			$.ajax(objectGoesHere)

		In the example below, we define/pass-in an object that has 5 properties
			- url
			- type
			- dataType
			- error
			- success
		See the jQuery documentation for a full list of acceptable properties
		http://api.jquery.com/jquery.ajax/

		*/
		$.ajax({
			url: app.musixMatchURL+ searchTerm + app.musixMatchRest + app.musixMatchKey, //word is the argument passed into the function
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				//console.log(data.status);
			},
			success: function(data){
				console.log("WooHoo!");
				//Check the browser console to see the returned data
				//console.log(data);
				//Use jQuery to insert the search term into the appropriate DOM element
				$("#searchTerm").html(data[0]);
				var searchResults = data[0].message.body.track_list[0].track_name;
				console.log(searchResults);
				//Loop through our array of results
				for (var i = 0; i < searchResults.length; i++){
					//Create an html string with a tag, class, and the search result
					var htmlString = "<p class='mmResults'>" + searchResults[i] + "</p>";

					//Use jQuery's append() function to add the searchResults to the DOM
					$("#resultsTarget").append(htmlString);

				}
			}
		});
	}

};
//Code to be executed once the page has fully loaded
$(document).ready(function(){
	console.log("LOADED!!!!");
	app.initialize();
});	
