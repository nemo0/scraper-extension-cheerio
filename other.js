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

// Node.js Starts Here
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

// Getting Comments from Single Post
let commentArray = [];

const listOfComments = $('[data-sigil=m-mentions-expand]')
  .find('[data-sigil=comment-body]')
  .toArray()
  .map((element) => {
    let comments = {};
    comments.comment = $(element).text();
    commentArray.push(comments);
  });

const listOfCommenter = $('[data-sigil=comment]')
  .find('div:nth-child(2) > div > div > div > a')
  .toArray()
  .map((element) => $(element).text());

console.log(listOfCommenter);
console.log(listOfComments);
console.log(commentArray);

// const linksOfPosts = $('#m_group_stories_container')
//   .find('a:contains("Comment")')
//   .toArray()
//   .map((element) => {
//     $(element).attr('href');
//   });
// console.log(linksOfPosts);

let links = [];
$('a:contains("Comment")').each((index, elem) => {
  links.push($(elem).attr('href'));
});
console.log(links);

let postId = [];
let urlArr = [];

for (link of links) {
  newLink = link.split('/');
  postId.push(newLink[5]);
  const urlPost = newLink.splice(0, 5).join('/');
  urlArr.push(urlPost);
}

urlArr = [...new Set(urlArr)];
console.log(urlArr);

chrome.runtime.sendMessage(
  {
    message: 'sending_array_posts',
    url: urlArr,
  },
  function (response) {
    console.log(`message from background: ${JSON.stringify(response)}`); // shows undefined
  }
);

for (let i = 1; i < urlArr.length; i++) {
  let fullUrl = 'https://m.facebook.com' + urlArr[i];
  chrome.runtime.sendMessage({
    message: 'update_tab_for_comments',
    url: fullUrl,
  });
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message === 'tab_updated_for_comments') {
      const listOfComments = $('[data-sigil=m-mentions-expand]')
        .find('[data-sigil=comment-body]')
        .toArray()
        .map((element) => {
          let comments = {};
          comments.comment = $(element).text();
          commentArray.push(comments);
        });
    }
  });
}
