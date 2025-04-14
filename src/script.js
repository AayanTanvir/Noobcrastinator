document.addEventListener('DOMContentLoaded', function() {
    
    const blockedSitesURL = chrome.runtime.getURL("blockedSites.html");
    const blockedURLWrapper = document.getElementById("URL-wrapper"); 

    document.getElementById("blockedSitesBtn")?.addEventListener('click', () => {
        chrome.tabs.create({ url:blockedSitesURL });
    })

    

})