/*
This example will search MusixMatch for song titles with the word "salad", (or whatever search word a user types in)
And then populate the result on the page using jQuery
*/
var app = {
	//Define the url for the wikipedia API call
	musixMatchURL: "http://api.musixmatch.com/ws/1.1/track.search?&format=jsonp&q_track=",
	//newCurrentWord: "salad",
	//musixMatchRest:"&page_size=10&page=1&s_track_rating=desc",
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
		//console.log(newCurrentWord);
		//Execute the MusixMatch API call function with the currentWord var as the argument
		app.searchMusixMatch(app.newCurrentWord);
	});	
		//What if someone just wants to click "ENTER"?
		//Use jQuery to assign a callback function when enter is pressed 
		//This will ONLY work when the 'query' input box is active
		$("#query").keypress(function(e){
			console.log(e);
			//If enter key is pressed
			if (e.which == 13){
			//Use jQuery's trigger() function to execute the click event
			$("#search").trigger('click');
			}
		});
	},	
	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	searchMusixMatch: function(word){
		console.log("Executing the searchMusixMatch function");	

		$.ajax({
			url: app.musixMatchURL + word /*+ app.musixMatchRest+ &format=jsonp& */ + app.musixMatchKey, //word is the argument passed into the function
			type: 'GET',
			dataType: 'jsonp',
			error: function(data){
				console.log("We got problems");
				//console.log(data.status);
			},
			success: function(data){
				console.log("WooHoo!");
				//Check the browser console to see the returned data
				console.log(data);
				//Use jQuery to insert the search term into the appropriate DOM element
				//$("#searchTerm").html(data[0]);
				var searchResults1 = (data.message.body.track_list[0].track_name); 
				var searchResults2 = (data.message.body.track_list[0].artist_name);
				console.log(searchResults1);
				console.log(searchResults2);
				//Loop through our array of results
				//for (var i = 0; i < searchResults.length; i++){
					//Create an html string with a tag, class, and the search result
					var htmlString = "<p class='mmResults'>" + searchResults1 + searchResults2 + "</p>";
				//var printResults = function(data){
					//printResults(searchResults1 + searchResults2);
					//Use jQuery's append() function to add the searchResults to the DOM
					$("#resultsTarget").append(htmlString);

				}
			}
		);
	}

};
//Code to be executed once the page has fully loaded
$(document).ready(function(){
	console.log("LOADED!!!!");
	app.initialize();
});	
