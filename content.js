// Adding m in place of www
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get_me_url') {
    let url = request.url;
    url = url.replace('www', 'm');
    chrome.runtime.sendMessage({
      message: 'update_tab',
      url: url,
    });
    return true;
  }
  // if (request.message === 'get_me_dom') {
  //   var html = document.documentElement.outerHTML;
  //   chrome.extension.sendMessage({ message: 'dom', dom: html });
  // }
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === 'get_dom') {
//     var html = document.documentElement.outerHTML;
//     chrome.extension.sendMessage({ message: 'dom', dom: html });
//   }
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === 'get_me_dom') {
//     var html = document.documentElement.outerHTML;
//     chrome.extension.sendMessage({ message: 'dom', dom: html });
//   }
// });
var html = document.documentElement.outerHTML;
chrome.extension.sendMessage(null, { message: 'dom', dom: html });
