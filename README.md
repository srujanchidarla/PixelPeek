# PixelPeek - Instant Dimension Tool

**PixelPeek** is a lightweight and easy-to-use Chrome extension designed to display the pixel dimensions of media elements (images, videos, etc.) on any webpage, simply by hovering over them. Whether you're a web developer, designer, or just curious about the size of media content, PixelPeek offers an intuitive way to get accurate measurements instantly.

## Features
- Displays pixel dimensions (width and height) for images, videos, iframes, canvas elements, and other media on hover.
- Handles dynamic content by continuously observing newly added elements.
- Works across all websites, providing instant feedback without page reloads.
- Clean, minimalistic tooltip with clear and legible dimension data.
- No data collection – privacy-focused.

## Installation

You can install PixelPeek directly from the [Chrome Web Store](https://chrome.google.com/webstore/detail/your-extension-id) or follow the manual installation steps below.

### From Chrome Web Store:
1. Go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/your-extension-id).
2. Click the **Add to Chrome** button.
3. Confirm by clicking **Add Extension**.

### Manual Installation (Development Mode):
1. Clone this repository or download the ZIP file:
    ```bash
    git clone https://github.com/srujanchidarla/pixelpeek.git
    ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder where you cloned or extracted the PixelPeek files.
5. The PixelPeek extension will now be available in your Chrome browser.

## How It Works

1. Once installed, activate PixelPeek by clicking the extension icon in the Chrome toolbar.
2. Hover over any image, video, or media element on a webpage.
3. A tooltip will instantly appear, displaying the pixel dimensions (width x height) of the media element.
4. You can also view the pixel sizes for dynamically loaded content, thanks to the built-in MutationObserver.


