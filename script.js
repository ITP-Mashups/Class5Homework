
var app = {
	//Define the url for the wikipedia API call
	apiURL: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=",
	apiKey:"5885177448fbc77518029151b59bcd46",
	apiText:"&text=",
	apiTerm:"Fenway",
	apiCb: "&format=json&nojsoncallback=1&extras=url_o",

	//A place to set up listeners or kick off an initial function
	initialize: function() {   
		//Execute the Wikipedia API call function with the currentWord var as the argument
		app.hitApi();
		
	},

	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	hitApi: function() {

		$.ajax({
			url: app.apiURL + app.apiKey + app.apiText + app.apiTerm + app.apiCb,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},

			success: function(data){
				// debugger;
				app.onSuccess(data);
			}
		});
	},

	onSuccess: function(data) {
		console.log(data);
		$('#results').html(data);

		var randomImgNum = Math.floor(Math.random()*100);
		var randomImgNum2 = Math.floor(Math.random()*50);

		var thePhoto = data.photos.photo[randomImgNum].url_o;
		var thePhotoTitle = data.photos.photo[randomImgNum].title;
		app.makeHTML(thePhotoTitle, thePhoto);

		var thePhoto2 = data.photos.photo[randomImgNum2].url_o;
		var thePhotoTitle2 = data.photos.photo[randomImgNum2].title;
		app.makeHTML2(thePhotoTitle2, thePhoto2);

	},

	makeHTML: function(thePhotoTitle,thePhoto){
		var htmlString = '<div class="flickr-box">';
		htmlString += '<h1>' + thePhotoTitle + '</h1>';
		htmlString += '<img src= "' + thePhoto + '">';
		htmlString += '</div>';

		$("body").append(htmlString);
	},

	makeHTML2: function(thePhotoTitle2,thePhoto2){
		var htmlString2 = '&nbsp';
		htmlString2 += '<div class="flickr-box2">';
		htmlString2 += '<h1>' + thePhotoTitle2 + '</h1>';
		htmlString2 += '<img src= "' + thePhoto2 + '">';
		htmlString2 += '</div>';

		$("body").append(htmlString2);
	}
};

// var url = "";


// $.ajax({
//   url: url,
//   success: function(result){
//   if("copyright" in result) {
//     $("#copyright").text("Image Credits: " + result.copyright);
//   }
//   else {
//     $("#copyright").text("Image Credits: " + "Public Domain");
//   }
  
//   if(result.media_type == "video") {
//     $("#apod_img_id").css("display", "none"); 
//     $("#apod_vid_id").attr("src", result.url);
//   }
//   else {
//     $("#apod_vid_id").css("display", "none"); 
//     $("#apod_img_id").attr("src", result.url);
//   }
//   $("#reqObject").text(url);
//   $("#returnObject").text(JSON.stringify(result, null, 4));  
//   $("#apod_explaination").text(result.explanation);
//   $("#apod_title").text(result.title);
// }
// });