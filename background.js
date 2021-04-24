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

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.message === 'update_tab') {
    await chrome.tabs.update({ url: request.url });
    return true;
  }
  if (request.message === 'dom') {
    var dom = request.dom;
    console.log(dom);
    return true;
  }
});

// chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {});

// chrome.runtime.onMessage.addListener(function (tabId, info, tab) {
//   chrome.tabs.sendMessage(tabId, {
//     message: 'get_dom',
//   });
// });

// async function sendUpdateTabReq() {
//   await chrome.tabs.sendMessage(sender.tab.id, { message: 'get_me_dom' });
// }

// chrome.runtime.sendMessage({ message: 'get_me_dom' });
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === 'dom') {
//     console.log(request.dom);
//   }
// });
