var browser = browser || chrome;
// Run the content script each time the page is loaded
// Reloads mean we need to look for new buttons etc and add listeners
browser.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status == "complete") {
        browser.tabs.executeScript(null,{file:"content.js"});
    }
});

