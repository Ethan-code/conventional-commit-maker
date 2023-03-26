chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'hello') {
        sendResponse({ success: true, message: `${request.message} world!` });
    }
});