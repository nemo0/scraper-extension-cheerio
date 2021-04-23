chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'browser_action') {
    console.log(request.url);
  }
});
