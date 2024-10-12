document.addEventListener("DOMContentLoaded", function () {
  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Execute a script in the current tab to collect media pixel rates
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: getMediaPixelRates,
      },
      (results) => {
        const outputDiv = document.getElementById("output");
        if (results && results[0]) {
          const mediaData = results[0].result;
          if (mediaData.length > 0) {
            // Display the media pixel data
            outputDiv.innerHTML = mediaData
              .map(
                (item) =>
                  `<p class="media-info">${item.type}: ${item.width}x${item.height} pixels</p>`
              )
              .join("");
          } else {
            outputDiv.textContent = "No media elements found on this page.";
          }
        }
      }
    );
  });
});

// Function to collect pixel dimensions for images and videos
function getMediaPixelRates() {
  const mediaElements = [
    ...document.images,
    ...document.querySelectorAll("video"),
  ];
  return mediaElements.map((el) => ({
    type: el.tagName.toLowerCase(),
    width: el.videoWidth || el.naturalWidth || 0,
    height: el.videoHeight || el.naturalHeight || 0,
  }));
}
