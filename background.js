chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    var url = tabs[0];
    var newUrl = url.url.replace('www', 'm');
    // use `url` here inside the callback because it's asynchronous!
    chrome.tabs.sendMessage(url.id, {
      message: 'browser_action',
      url: url.url,
    });
    chrome.tabs.create({ url: newUrl });
  });
});
