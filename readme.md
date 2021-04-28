### Plan

- Get URL with content script

- Pass in using message passing to background script

- Convert to mobile version using background script

- Access DOM of mobile version

- Use cheerio to scrape

### Problem Currently Facing

- Need to send the URL array to the background page, otherwise the array resets everytime when we visit a new posts page
- or have to find a way in the `content` page so that it doesn't resets the array.

### Steps after Getting the Array in Background Page

- Will loop through the length of the array page, and for each item will update the tab url and send a message to the `content` page.
- The `content` page can access the Page Source, after accessing the page source, will send a message to the background page along with the data
- When the message is received, will update the array of comments in the background page

| The main `content` page is the `other.js` file. `content.js` is generated using `browserify`.
