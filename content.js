chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'browser_action') {
    let url = request.url;
    url = url.replace('www', 'm');
    console.log(url);
    chrome.runtime.sendMessage({ message: 'open_new_tab', url: url });
    var html = document.documentElement.outerHTML;
    chrome.extension.sendMessage({ message: 'dom', dom: html });
  }
});
