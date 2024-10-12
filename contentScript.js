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

// Function to update the tooltip position and content
function showTooltip(event, width, height) {
  tooltip.style.left = `${event.pageX + 10}px`; // Slightly offset from the cursor
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.textContent = `Size: ${width}x${height} pixels`;
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
    // Mouse enters the media element
    el.addEventListener("mouseover", (event) => {
      let width = 0;
      let height = 0;

      // Determine the element type and extract dimensions accordingly
      if (
        el.tagName.toLowerCase() === "img" ||
        el.tagName.toLowerCase() === "video"
      ) {
        width = el.videoWidth || el.naturalWidth || 0;
        height = el.videoHeight || el.naturalHeight || 0;
      } else if (
        el.tagName.toLowerCase() === "svg" ||
        el.tagName.toLowerCase() === "canvas" ||
        el.tagName.toLowerCase() === "iframe"
      ) {
        width = el.clientWidth;
        height = el.clientHeight;
      } else if (
        el.tagName.toLowerCase() === "a" ||
        el.tagName.toLowerCase() === "button" ||
        el.getAttribute("role") === "button"
      ) {
        // For links and buttons, calculate width and height
        const rect = el.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
      }

      showTooltip(event, width, height);
    });

    // Mouse moves within the media element, keeping the tooltip visible
    el.addEventListener("mousemove", (event) => {
      let width = 0;
      let height = 0;

      // Re-calculate size on mouse move for dynamic updates
      if (
        el.tagName.toLowerCase() === "img" ||
        el.tagName.toLowerCase() === "video"
      ) {
        width = el.videoWidth || el.naturalWidth || 0;
        height = el.videoHeight || el.naturalHeight || 0;
      } else if (
        el.tagName.toLowerCase() === "svg" ||
        el.tagName.toLowerCase() === "canvas" ||
        el.tagName.toLowerCase() === "iframe"
      ) {
        width = el.clientWidth;
        height = el.clientHeight;
      } else if (
        el.tagName.toLowerCase() === "a" ||
        el.tagName.toLowerCase() === "button" ||
        el.getAttribute("role") === "button"
      ) {
        const rect = el.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
      }

      showTooltip(event, width, height); // Update the tooltip
    });

    // Mouse leaves the media element, hide the tooltip
    el.addEventListener("mouseout", hideTooltip);
  });
}

// Call the function to add hover listeners
addHoverListeners();
