var app = {
	initialize: function() {
		app.getSearchTerm();
	},

    getSearchTerm: function() {
        $('#submitSearch').click(function(){
        
            //Clear any previous search results 
            $('.beers').html('');
            $('.food').html('');

            //Get the input box value
            var beerTerm = $('#inputBox').val();
            console.log(beerTerm);

            //run the api call with the beerTerm
            app.getBeerData(beerTerm);
        })
        
    },
        
    getBeerData: function(Term) {
		console.log("Beers");

		var BeerURL = "http://api.brewerydb.com/v2/search?key=";
		var myBeerAPIKey = "adc1e562bb00337ee44e0dcf23cfefcc";
        var SearchParam = "&q="+Term+"&type=beer&withIngredients=Y"
		var BeerReqURL = BeerURL + myBeerAPIKey+SearchParam;

		$.ajax({
			url: BeerReqURL,
			type: 'GET',
			dataType: 'json',
			
            error: function(err){
				console.log(err);
			},
			
            success: function(data){
				console.log("Got the data");
				var theBeers = data.data;
				console.log(theBeers);

				//Clear out the container
				$('.beers').html("");
                
                var htmlString = '<table style="width:100%">';
                htmlString +=	'<tr><th>Name</th><th>Style</th><th>Description</th><th>Icon</th><tr>';
				
                for (var i = 0; i < theBeers.length; i++)
                    htmlString +=    '<tr><td>'+theBeers[i].name+'</td><td>'+theBeers[i].style.name+'</td><td>placeholder</td><td><img src: placeholder></td></tr>'
                
                htmlString += '</table>'
                $('.beers').append(htmlString);

			}
		});
	}
}
    
