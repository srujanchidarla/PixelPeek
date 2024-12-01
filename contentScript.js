// Create and style the tooltip for displaying dimensions
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

// Function to handle hover and show tooltip
function handleHover(event) {
  const el = event.target;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
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
  }
}

// Create an IntersectionObserver to manage visibility
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // Add event listeners for showing and hiding the tooltip
        el.addEventListener("mousemove", handleHover);
        el.addEventListener("mouseleave", hideTooltip);
      } else {
        // Remove event listeners when the element is not in view
        el.removeEventListener("mousemove", handleHover);
        el.removeEventListener("mouseleave", hideTooltip);
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
);

// Function to add hover listeners to elements using IntersectionObserver
function addHoverListeners() {
  const elements = `
    img, i, svg, p, span, h1, h2, h3, h4, h5, h6, strong, b, em, i, div, section, header, footer,
    aside, article, nav, button, a, input, select, textarea, video, audio, canvas, iframe, ul, ol,
    li, table, tr, td, th, progress, meter, hr, figure, figcaption
  `;
  document.querySelectorAll(elements).forEach((el) => observer.observe(el));
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
const mutationObserver = new MutationObserver(
  debounce((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        addHoverListeners();
      }
    });
  }, 100)
);

// Start observing with optimized options
mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
});

// Cleanup function to disconnect the observer and remove event listeners
function cleanup() {
  observer.disconnect();
  mutationObserver.disconnect();
  document.querySelectorAll("*").forEach((el) => {
    el.removeEventListener("mousemove", handleHover);
    el.removeEventListener("mouseleave", hideTooltip);
  });
}

// Attach cleanup to page unload event
window.addEventListener("unload", cleanup);
