chrome.action.onClicked.addListener((tab) => {
  if (
    !tab.url.startsWith("chrome://") &&
    !tab.url.startsWith("chrome-extension://")
  ) {
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
