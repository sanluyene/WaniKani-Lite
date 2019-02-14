chrome.storage.sync.get('lessons', function(data) {
  document.getElementById("lessons").innerHTML = data.lessons;
});

chrome.storage.sync.get('reviews', function(data) {
  document.getElementById("reviews").innerHTML = data.reviews;
});