var app = {


	//Define the url for the API call
	apiURL: "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=1d116fb113749c6ce9d8512c7fca76e1&year_start=",

	//define a search term so it returns data in console
	// used pre-defined term as first phase of figuring out code currentWord: "1990",

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		$("#search").click(function(){ //new
			console.log("Clicked search"); //new
			//clear div in html
		$("#images").html(""); //new
			//using jquery to get value of query input box
			var newSearchTerm = $("#query").val(); //new
			console.log(newSearchTerm); //had 'currentWord' before
		//Execute the API call function with the 'newSearchTerm' as the argument
		app.searchCoopHew(newSearchTerm); //had 'currentWord' before 
	});

	 //Use jQuery to assign a callback function when enter is pressed 
		//This will ONLY work when the 'query' input box is active
		$("#query").keypress(function(e){ //new
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
	searchCoopHew: function(searchTerm) { //had 'word' before
		console.log("Executing the searchCoopHew function");
		$.ajax({
			url: this.apiURL + searchTerm, //had 'word' before
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){

				app.onSuccess(data);
			
			}
		});
	},




//	onSuccess: function(data) {
	//	console.log(data);
	//	$("#searchTerm").html(data);
	//	var searchResults = data.title;
	//	for (var i = 0; i < searchResults.length; i++){		
	//		var htmlString = "<p class='wikiResults'>" + searchResults[i] + "</p>";
	//	$("#results").append(htmlString);
	//			}
	//}
//};


onSuccess: function(data) {
		console.log("Woohoo!");
		console.log(data);
		for (var i = 0; i < data.objects.length; i++){
		var searchResults = data.objects[i].images[0].b.url;
		console.log(searchResults);
		var img = $('<img />',
			{src: searchResults})
		.appendTo($('#images'));



		//var img = $("images"); //Equivalent: $(document.createElement('img'))
		//img.attr('src', searchResults);
		//img.appendTo("images");

		//var htmlString = "<p class='coopHewResults'>" + searchResults + "</p>";
		//$("#results").append(htmlString);
		//$("results").load(function() {
		}
		}


		//NEED THE TWO LINES BELOW TO LOAD URLS
		//var htmlString = "<p class='coopHewResults'>" + searchResults + "</p>";
		//this returns URLs: $("#results").append(htmlString);
	

	




	//	$("#searchTerm").html(data[i]);
	//	var searchResults = data.objects[i].title;
	//	for (var i = 0; i < searchResults.length; i++) {		
	//	var htmlString = "<p class='coopHewResults'>" + searchResults[i] + "</p>";
	//	$("#results").append(htmlString);
				
	//}
};


