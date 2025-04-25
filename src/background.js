import Browser from "webextension-polyfill";


const messageHandlers = {
    openBlockedSites: (msg, sendResponse) => {
        const url = Browser.runtime.getURL('blockedSites.html');
        Browser.tabs.create({ url: url }).then(() => {
            sendResponse({ success: true });
        }).catch((error) => {
            console.error('Error opening blocked sites:', error);
            sendResponse({ success: false });
        });
    },
}

const isURLBlocked = (url, blockedURL) => {
    if (!url || !blockedURL) return;
    try {
        const urlHost = new URL(url).hostname.toLowerCase();
        const blockedURLHost = new URL(blockedURL).hostname.toLowerCase();
        return urlHost === blockedURLHost || urlHost.endsWith(`.${blockedURLHost}`);
    } catch (error) {
        console.error("Error parsing URL:", error);
        return null;
    }
}

let blockedSitesCache = []; 

Browser.storage.local.get('blockedSites').then(({ blockedSites }) => {
    blockedSitesCache = blockedSites || [];
});

Browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.blockedSites) {
        blockedSitesCache = changes.blockedSites.newValue || [];
    }
});
    

Browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const handler = messageHandlers[msg.action];

    if (handler) {
        const result = handler(msg, sendResponse);
        return result instanceof Promise ? result : true;
    } else {
        console.warn("Unknown action:", msg.action);
        alert("Unknown action: " + msg.action);
    }
});

Browser.tabs.onUpdated.addListener( async (tabID, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
        for (const url of blockedSitesCache) {
            if (isURLBlocked(tab.url, url)) {
                Browser.tabs.update(tabID, { url: Browser.runtime.getURL('blockedSite.html') });
                break;
            }
        }
    }
});
