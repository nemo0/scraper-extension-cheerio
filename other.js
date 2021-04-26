// Adding m in place of www
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'get_me_url') {
//     let url = request.url;
//     url = url.replace('www', 'm');
//     chrome.runtime.sendMessage({
//       message: 'update_tab',
//       url: url,
//     });
//   }
//   return true;
// });

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

const cheerio = require('cheerio');
const $ = cheerio.load(html);

const title = $('title');
console.log(title.text());

// const comment = $('[data-sigil=comment-body]');
// console.log(comment.text());

// var category = $('a')
//   .filter(function () {
//     return $(this).text().trim() === 'Comment';
//   })
//   .next()
//   .text();
// console.log(category);

// var link = $('a:contains("Comment")');
// console.log(link.attr('href'));

const listOfComments = $('[data-sigil=m-mentions-expand]')
  .find('[data-sigil=comment-body]')
  .toArray()
  .map((element) => $(element).text());

const listOfCommenter = $('[data-sigil=comment]')
  .find('div:nth-child(2) > div > div > div > a')
  .toArray()
  .map((element) => $(element).text());

console.log(listOfCommenter);
console.log(listOfComments);
