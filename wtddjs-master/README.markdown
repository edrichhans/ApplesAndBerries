Web Test-Driven Development with JavaScript
-------------------------------------------

It's well and good to write tests to verify your server-side
and client-side logic, but do you know that the whole
solution really is working?

You can of course test your service manually after
deploying, but that becomes tedious. By using Selenium, we
can test that the solution works end-to-end.

This project explores how to get the whole set of tools
up and running for a NodeJs-based stack.

How to use
==========
1. Check out the code
2. Run `npm install` to install dependencies
3. Run `npm test` to run the test
4. Run `npm start` to start the server at http://localhost:3000

Check out the test at test/simpleWebTest.js and the server
at app.js.

### Configuration

* Environment variable URL tests with manually started server instead of running embedded
* Environment variable BROWSER uses another browser than PhantomJs. Try "chrome" or "firefox"


Development log
===============

1. npm init
2. npm install --save express
3. Create server.js and public/index.js
4. Manual test in browser by doing npm start
5. npm install --save-dev mocha
6. npm install selenium-standalone webdriverjs chai phantomjs
7. Create test/simpleWebTest.js
8. Change the test to start up the server


Problems encountered:
=====================

* Selenium doesn't correctly fork PhantomJS on Windows
  * Workaround: Submit phantomjs.binary.path as desiredCapabilities
  * Submitted patch to Selenium team: https://code.google.com/p/selenium/issues/detail?id=7514
* PhantomJS sometimes don't install correct on Windows?


Further work:
=============

Check out alternative webdriver API at https://github.com/admc/wd
