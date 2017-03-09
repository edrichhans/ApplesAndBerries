var webdriver = require('./webdriver');
var expect = require('chai').expect;

describe("login page", function() {

  before(function(done) {
    this.timeout(15000);
    client = webdriver(done);
  });

  it("has wrong password", function(done) {
    
    var login = ('#login');
    var username = login.selectByAttribute('name', '#username');
    var password = login.selectByAttribute('name','#password');
    login.setValue(username, 'edrichhans');
    login.setValue(password, 'nigga');

    var password2 = login.getValue(password);
    console.log(password2);


  });

  after(function(done) {
    client.end(done);
  });

  /*it('should have wrong password', function(){

    browser.url('http://applesandberries.herokuapp.com/login');
    var username = browser.selectByAttribute('name', '#username');
    var password = browser.selectByAttribute('name','#password');
    browser.setValue(username, 'edrichhans');
    browser.setValue(password, 'nigga');

    var password2 = browser.getValue(password);
    console.log(password2);

  });*/

});
