# Mobile Web Specialist Certification Course

#### _Restaurant Reviews Project Stage 1_

---

### Project Overview:

##### 1. Responsive Design
- responsive content (media queries)
- responsive images (srcset, sizes)

##### 2. Accessibility
- ARIA roles
- navigation using tab
- alternate text

##### 3. Offline Availability
- availability offline (service worker)
- IndexedDB

##### 4. Site Performance (Based on Lighthouse)
 - Progressive Web Apps:  >90
- Performance: >70
- Accessibility: >90
  

### How to run?

  

##### Option 1 ( _Python_ )

In a terminal, check the version of Python you have: `python -V`. If you have **Python 2.x**, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don’t have Python installed, navigate to Python’s website to download and install the software.

With your server running, visit the site: __http://localhost:8000__

##### Option 2 ( _VSCode_ )

Install extension Live Server in your VSCode editor using Extensions (**__Ctrl+Shift+X__**). Reload editor. Open your project, find icon **_Go Live_** and click it. Browser should open your page, but if not visit __localhost:5500__ in your browser.

#### Development local API Server
Server depends on [node.js LTS Version: v6.11.2](https://nodejs.org/en/download/) , [npm](https://www.npmjs.com/get-npm), and [sails.js](http://sailsjs.com/) Please make sure you have these installed before proceeding forward.

_Location of server = /server/_

##### Install project dependancies
    npm i
##### Install Sails.js globally
    npm i sails -g
##### Start the server
	node server

You have access to your server at localhost:1337