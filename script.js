var app = {
	//Define the url for the wikipedia API call
	apiURL: "",

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		//Execute the Wikipedia API call function with the currentWord var as the argument
		app.hitApi();
	},

	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	hitApi: function() {
		*/
		$.ajax({
			url: app.apiURL
			type: 'GET',
			dataType: 'jsonp',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				app.onSuccess(data);
			}
		});
	},

	onSuccess: function(data) {
		console.log(data);
		$('#results').html(data);
	}
};

