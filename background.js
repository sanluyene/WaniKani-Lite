// TODO:
// Make it pretty
// Erroring for bad API keys

// Future Fun Stuff:
// Option to display # in Japanese
// Option to change auto-refresh timer

// Initial setup of extension
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({
		api: '',
		username: 'No One!',
		level: -42,
		lessons: 0,
		reviews: 0
	});
});

// Check for updated data periodically; default is 20
var minutes = 20;
// chrome.storage.sync.get('refresh', function(data) {
//   minutes = data.refresh;
// });
setInterval(wkCallback, minutes * 60 * 1000);

// This callback function will load upcoming lesson and review data
// Along with username and level information
function wkCallback() {
	var lessons = 0;
	var reviews = 0;
	var apiToken = '';

	chrome.storage.sync.get(['api'], function(data) {
		apiToken = data.api;

		// If you haven't entered your API key yet
		if (apiToken == '') {
			alert('Please enter your WaniKani API key on the Extension Options page.');
		}
		else {
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
					chrome.storage.sync.set({lessons: lessons.toString()});

					reviews = responseBody.data.reviews[0].subject_ids.length;
					chrome.storage.sync.set({reviews: reviews.toString()});
					
					var total = lessons + reviews;
					chrome.browserAction.setBadgeText({text:total.toString()});
				});
		}
	});
}