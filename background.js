chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    var url = tabs[0];
    // use `url` here inside the callback because it's asynchronous!
    chrome.tabs.sendMessage(url.id, {
      message: 'get_me_url',
      url: url.url,
    });
  });
});

var dom;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'update_tab') {
    chrome.tabs.update({ url: request.url });
    return true;
  }
  if (request.message === 'dom') {
    dom = request.dom;
    console.log(dom);
  }
  if (request.message === 'update_tab_for_comments') {
    chrome.tabs.update({ url: request.url });
    chrome.runtime.sendMessage(null, {
      message: 'tab_updated_for_comments',
    });
  }
});
