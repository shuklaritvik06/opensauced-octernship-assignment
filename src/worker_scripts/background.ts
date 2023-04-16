chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL(
      "https://github.com/open-sauced-craftwork/open_sauced_craftwork_browser_extension-shuklaritvik06/issues"
    );
  }
});
