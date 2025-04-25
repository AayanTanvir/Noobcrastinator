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


