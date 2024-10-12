chrome.action.onClicked.addListener((tab) => {
  // Check if the URL is not a chrome:// or chrome-extension:// URL
  if (
    !tab.url.startsWith("chrome://") &&
    !tab.url.startsWith("chrome-extension://")
  ) {
    // Inject content script only if the URL is valid
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"],
    });
  } else {
    console.warn(
      "Cannot inject script into chrome:// or chrome-extension:// pages."
    );
  }
});
