document.addEventListener('DOMContentLoaded', function() {
    
    const blockedSitesURL = chrome.runtime.getURL("blockedSites.html");
    
    document.getElementById("openBlockedSites").addEventListener('click', () => {
        chrome.tabs.create({ url:blockedSitesURL });
    }) 

})