// Save new options onClick
function save_options() {
	var apiKey = document.getElementById('api').value;
	chrome.storage.sync.set({
		api: apiKey
	}, function() {
		var status = document.getElementById('status');
	    status.textContent = 'Options saved.';
	    setTimeout(function() {
			status.textContent = '';
	    }, 1000);

		wkCallback();
	});
}

function restore_options() {
	chrome.storage.sync.get({
		api: 'Enter here'
	}, function(items) {
		document.getElementById('api').value = items.api;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);