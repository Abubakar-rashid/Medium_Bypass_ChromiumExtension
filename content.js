function initToggle() {
  const currentUrl = window.location.href;
  let targetUrl = "";
  let btnText = "";

  if (currentUrl.includes("freedium-mirror.cfd")) {
    // We are on Freedium. Let's find the original Medium link.
    // Freedium usually appends the URL like freedium-mirror.cfd/https://medium.com/...
    const parts = currentUrl.split("freedium-mirror.cfd/");
    if (parts.length > 1) {
      targetUrl = parts[1];
      btnText = "📖 Back to Medium";
    }
  } else if (currentUrl.includes("medium.com")) {
    // We are on Medium. Check if it's an article (more than 3 slashes)
    // Example: https://medium.com/@user/title has 4+ slashes.
    const urlPath = window.location.pathname;
    
    if (urlPath && urlPath.length > 1) {
      targetUrl = `https://freedium-mirror.cfd/${currentUrl}`;
      btnText = "🚀 Open in Freedium";
    }
  }

  if (targetUrl && btnText) {
    // Check if button already exists to prevent duplicates
    if (!document.getElementById("freedium-toggle-btn")) {
      const btn = document.createElement("button");
      btn.id = "freedium-toggle-btn";
      btn.innerText = btnText;
      btn.onclick = () => { window.location.href = targetUrl; };
      document.body.appendChild(btn);
    }
  }
}

// Run immediately and also on a slight delay for Single Page App navigation
initToggle();
setInterval(initToggle, 2000);