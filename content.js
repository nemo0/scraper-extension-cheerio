chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'browser_action') {
    let url = request.url;
    url = url.replace('www', 'm');
    console.log(url);
  }
});
