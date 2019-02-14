// TODO:
// Add login/api key entry
// Set up options for refresh

// Future Fun Stuff
// Option to display # in Japanese

// Initial setup of extension
chrome.runtime.onInstalled.addListener(function() {
    wkCallback();
});

// Check for new data upon icon click
chrome.browserAction.onClicked.addListener(wkCallback);

// Check for updated data periodically; default is 20
var minutes = 5;
chrome.storage.sync.get('refresh', function(data) {
  minutes = data.refresh;
});
setInterval(wkCallback, minutes * 60 * 1000);

// This callback function will load upcoming lesson and review data
// Along with username and level information
function wkCallback() {
	console.log("WK CB!");

	var lessons = 0;
	var reviews = 0;

	// Ash
	var apiToken = 'c2a9194c-1582-4f93-82c6-199ae68dd0ef';
	// Seneca
	// var apiToken = 'ef4a59ab-b45d-423a-8b2c-0a3033939d55';
	
	// User Information
	var userEndpointPath = 'user';
	var userRequestHeaders = new Headers({
		Authorization: 'Bearer ' + apiToken,
	});
	var userEndpoint = new Request('https://api.wanikani.com/v2/' + userEndpointPath, {
	    method: 'GET',
	    headers: userRequestHeaders
	});

	fetch(userEndpoint)
		.then(response => response.json())
		.then(responseBody => {
			chrome.storage.sync.set({username: responseBody.data.username});
			chrome.storage.sync.set({level: responseBody.data.level.toString()});
		});
	
	// Lessons and Reviews Data
	var summaryEndpointPath = 'summary';
	var summaryRequestHeaders = new Headers({
		Authorization: 'Bearer ' + apiToken,
	});
	var summaryEndpoint = new Request('https://api.wanikani.com/v2/' + summaryEndpointPath, {
	    method: 'GET',
	    headers: summaryRequestHeaders
	});

	fetch(summaryEndpoint)
		.then(response => response.json())
		.then(responseBody => {
			lessons = responseBody.data.lessons[0].subject_ids.length;
			console.log(responseBody.data.lessons[0].subject_ids.length);
			chrome.storage.sync.set({lessons: lessons.toString()});
			reviews = responseBody.data.reviews[0].subject_ids.length;
			chrome.storage.sync.set({reviews: reviews.toString()});
			var total = lessons + reviews;

			chrome.browserAction.setBadgeText({text:total.toString()});
		});
}