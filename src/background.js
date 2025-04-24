import Browser from "webextension-polyfill";
    
const validateURL = (url) => {
    url = url.trim().toLowerCase();
    if (!url.includes(".")) {
        return null;
    }

    try {
        const parsedURL = new URL(url);
        return parsedURL.href;
    } catch (error) {
        try {
            const parsedURL = new URL(`https://${url}`);
            return parsedURL.href;
        } catch (error) {
            return null;
        }
    }
}


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
    blockURL: (msg, sendResponse) => {
        if (msg.url) {
            const url = validateURL(msg.url);
            //add logic to add url to storage and block the site
            sendResponse({ success: true });
        } else {
            sendResponse({ success: false });
        }
    }
}

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


