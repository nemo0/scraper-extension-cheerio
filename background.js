chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    var url = tabs[0];
    // use `url` here inside the callback because it's asynchronous!
    chrome.tabs.sendMessage(url.id, {
      message: 'get_me_url',
      url: url.url,
      message2: 'new',
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
  }
  if (request.message === 'update_tab_for_comments') {
    chrome.tabs.update({ url: request.url });
    chrome.runtime.sendMessage(null, {
      message: 'tab_updated_for_comments',
    });
  }
});

chrome.runtime.sendMessage(null, { message: 'post_urls' });
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'post_urls') {
//     console.log(request.url);
//   }
// });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { message: 'open' });
});
