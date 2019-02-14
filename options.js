chrome.storage.sync.get('refresh', function(data) {
  document.getElementById('refresh').innerHTML = data.refresh;
});

// On save
//chrome.storage.sync.set({refresh: responseBody.data.refresh});