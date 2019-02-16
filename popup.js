// Check for updated data onClick
wkCallback();

chrome.storage.sync.get(['username'], function(data) {
	document.getElementById('username').innerHTML = data.username;
});

chrome.storage.sync.get(['level'], function(data) {
	document.getElementById('level').innerHTML = data.level;
});

chrome.storage.sync.get(['lessons'], function(data) {
	document.getElementById('lesson').innerHTML = data.lessons;
});

chrome.storage.sync.get(['reviews'], function(data) {
	document.getElementById('reviews').innerHTML = data.reviews;
});

chrome.storage.sync.get(['api'], function(data) {
	if (data.api == '') document.getElementById('error').innerHTML = 'Please enter your API key on the Extension Options page by right-clicking the icon.';
});
