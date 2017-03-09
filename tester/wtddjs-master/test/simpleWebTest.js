var webdriver = require('./webdriver');
var expect = require('chai').expect;

describe("web application", function() {

  before(function(done) {
    this.timeout(15000);
    client = webdriver(done);
  });

  after(function(done) {
    client.end(done);
  });

  it("has correct title on front page", function(done) {
    client.title(function(err, res) {
      expect(res.value).to.have.string("Hello World");
      done();
    });
  });

  it("clicks menu item", function(done) {
    client.click("#showMore", function(err) {
      expect(err).to.be.null;
      client.waitFor("#results div", 1000, function(err) {
        expect(err).to.be.null;
        client.getText("#results div", function(err, text) {
          expect(text).to.have.string("Here's more");
          done();
        });
      });
    });
  });

});
