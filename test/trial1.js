// This is a simple test script to open a website and
// validate title.
//

// required libraries
var webdriverio = require('webdriverio');

// a test script block or suite
describe('Title Test for Web Driver IO - Tutorial Test Page Website', function() {

  // set timeout to 10 seconds
 this.timeout(10000);
  var driver = {};

  // hook to run before tests
  before( function () {
    // load the driver for browser
    driver = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
    return driver.init();
  });

  // a test spec - "specification"
  it('should be load correct page and title', function () {
    // load page, then call function()
    return driver
      .url('http://www.tlkeith.com/WebDriverIOTutorialTest.html')
      // get title, then pass title to function()
      .getTitle().then( function (title) {
        // verify title
        (title).should.be.equal("Web Driver IO - Tutorial Test Page");
        // uncomment for console debug
        // console.log('Current Page Title: ' + title);
      });
  });

  // a "hook" to run after all tests in this block
 after(function() {
    return driver.end();
  });
});