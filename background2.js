(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var urls;
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
    if (request.message === 'take_urls') {
      urls = request.urls;
    }
  }
});

console.log(urls);

},{}]},{},[1]);
