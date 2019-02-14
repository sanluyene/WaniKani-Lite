// TODO:
// Add login/api key entry
// Add data to popup
// How to keep the popup portion running (from going inactive)
// How to run check every hour
// Change icon
// Option to display # in Japanese

chrome.runtime.onInstalled.addListener(function() {
    wkCallback();
});

chrome.browserAction.onClicked.addListener(function () {
    wkCallback();
});

function wkCallback() {
	var lessons = 0;
	var reviews = 0;

	// Ash
	var apiToken = 'c2a9194c-1582-4f93-82c6-199ae68dd0ef';
	// Seneca
	// var apiToken = 'ef4a59ab-b45d-423a-8b2c-0a3033939d55';
	
	var apiEndpointPath = 'summary';
	var requestHeaders = new Headers({
		Authorization: 'Bearer ' + apiToken,
	});
	var apiEndpoint = new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
	    method: 'GET',
	    headers: requestHeaders
	});

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(responseBody => {
			lessons = responseBody.data.lessons[0].subject_ids.length;
			chrome.storage.sync.set({lessons: lessons.toString()});
			reviews = responseBody.data.reviews[0].subject_ids.length;
			chrome.storage.sync.set({reviews: reviews.toString()});
			var total = lessons + reviews;

			chrome.browserAction.setBadgeText({text:total.toString()});
		    chrome.browserAction.setPopup({
		        popup: "popup.html"
		    });
		});
}