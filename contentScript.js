// Create a div to display the pixel dimensions
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
tooltip.style.color = "white";
tooltip.style.padding = "5px";
tooltip.style.borderRadius = "4px";
tooltip.style.zIndex = "1000";
tooltip.style.fontSize = "12px";
tooltip.style.display = "none"; // Initially hidden
tooltip.style.pointerEvents = "none"; // Prevent interaction with the tooltip itself
document.body.appendChild(tooltip);

// Function to show the tooltip with dimension information
function showTooltip(
  event,
  displayedWidth,
  displayedHeight,
  originalWidth,
  originalHeight
) {
  tooltip.style.left = `${event.pageX + 10}px`; // Slightly offset from the cursor
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.innerHTML = `
    <div>
      <strong>Displayed:</strong> ${displayedWidth}px × ${displayedHeight}px<br>
      <strong>Original:</strong> ${originalWidth}px × ${originalHeight}px
    </div>
  `;
  tooltip.style.display = "block";
}

// Function to hide the tooltip
function hideTooltip() {
  tooltip.style.display = "none";
}

// Function to add hover listeners to various elements including buttons
function addHoverListeners() {
  // Select all images, videos, SVGs, canvas, iframes, link icons (like share, WhatsApp, etc.), and buttons
  const mediaElements = [
    ...document.images,
    ...document.querySelectorAll("video, svg, canvas, iframe"),
    // Adding icons (anchor tags with common classes or specific hrefs for share buttons)
    ...document.querySelectorAll(
      'a[href*="whatsapp"], a[href*="share"], a[href*="delete"], a[href*="netflix"], a[href*="add"]'
    ),
    // Adding button elements and divs/spans that act as buttons
    ...document.querySelectorAll(
      'button, .button, [role="button"], div[onclick], span[onclick]'
    ),
  ];

  mediaElements.forEach((el) => {
    // Function to get dimensions and show tooltip
    const updateTooltip = (event) => {
      const rect = el.getBoundingClientRect();
      const displayedWidth = rect.width;
      const displayedHeight = rect.height;
      const originalWidth = el.naturalWidth || el.videoWidth || displayedWidth;
      const originalHeight =
        el.naturalHeight || el.videoHeight || displayedHeight;
      showTooltip(
        event,
        displayedWidth,
        displayedHeight,
        originalWidth,
        originalHeight
      );
    };

    // Mouse enters the media element
    el.addEventListener("mouseover", updateTooltip);
    // Mouse moves within the media element, keeping the tooltip visible
    el.addEventListener("mousemove", updateTooltip);
    // Mouse leaves the media element, hide the tooltip
    el.addEventListener("mouseout", hideTooltip);
  });
}

// Call the function to add hover listeners
addHoverListeners();

// Debounce function to limit the rate at which functions can fire
const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

// Observe for dynamically loaded content with optimized settings
const observer = new MutationObserver(
  debounce((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        addHoverListeners();
      }
    });
  }, 100)
);

// Start observing with optimized options
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
});

// Cleanup function to remove all listeners and observer
function cleanup() {
  observer.disconnect();
  document.querySelectorAll("*").forEach((el) => {
    el.removeEventListener("mouseover", updateTooltip);
    el.removeEventListener("mousemove", updateTooltip);
    el.removeEventListener("mouseout", hideTooltip);
  });
}

// Attach cleanup to page unload event
window.addEventListener("unload", cleanup);
