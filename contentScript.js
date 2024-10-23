// Create and style the tooltip for displaying dimensions
const tooltip = document.createElement("div");
document.body.appendChild(tooltip);
tooltip.style = `
    position: fixed; 
    background-color: rgba(0, 0, 0, 0.9); 
    color: white;
    padding: 8px 10px; 
    border-radius: 6px; 
    z-index: 10000; 
    font-size: 14px; 
    font-family: Arial, sans-serif;
    display: none; 
    pointerEvents: none; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    border: 1px solid rgba(255, 255, 255, 0.2); 
`;

// Function to show the tooltip with dimension information
function showTooltip(event, width, height) {
  tooltip.style.left = `${event.clientX + 20}px`; // Offset from cursor to avoid blocking it
  tooltip.style.top = `${event.clientY + 20}px`;
  tooltip.textContent = `Width: ${width}px, Height: ${height}px`;
  tooltip.style.display = "block";
}

// Function to hide the tooltip
function hideTooltip() {
  tooltip.style.display = "none";
}
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

// Debounced hover handler
const handleHover = debounce((event, el) => {
  const rect = el.getBoundingClientRect();
  showTooltip(event, rect.width, rect.height);
}, 50); // Reduced debounce time to 50ms for smoother interaction

// Function to add hover listeners selectively
function addHoverListeners() {
  const selector = `
        a, button, img, select, textarea, form, label, fieldset, legend, datalist,
        output, iframe, map, area, canvas, svg, video, audio, progress, meter
    `;
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseover", (event) => handleHover(event, el));
    el.addEventListener("mouseout", hideTooltip);
  });
}

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
    el.removeEventListener("mouseover", handleHover);
    el.removeEventListener("mouseout", hideTooltip);
  });
}

// Attach cleanup to page unload event
window.addEventListener("unload", cleanup);

// Initialize listeners initially
addHoverListeners();
