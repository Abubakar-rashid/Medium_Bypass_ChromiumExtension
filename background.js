// Function to create the menu
function createMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "openFreedium",
      title: "Open in Freedium",
      contexts: ["page", "link"],
      // This ensures it only shows up on Medium sites
      documentUrlPatterns: ["*://*.medium.com/*", "*://medium.com/*"]
    });
  });
}

// 1. Create menu when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  createMenu();
});

// 2. Also create menu when the service worker wakes up (extra safety)
chrome.runtime.onStartup.addListener(() => {
  createMenu();
});

// Handle the click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openFreedium") {
    // Priority: 1. Clicked Link, 2. Current Page URL
    const originalUrl = info.linkUrl || info.pageUrl;
    
    // Safety check: only redirect if it's a medium link
    if (originalUrl.includes("medium.com")) {
      const freediumUrl = `https://freedium-mirror.cfd/${originalUrl}`;
      chrome.tabs.create({ url: freediumUrl });
    }
  }
});