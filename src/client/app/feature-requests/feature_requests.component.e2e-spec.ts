describe('FeatureRequests', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have an input', () => {
    // expect(element(by.css('bc-home form input')).isPresent()).toEqual(true);
  });

  it('should have a list of computer scientists', () => {
    // expect(element(by.css('bc-home ul')).getText())
    //   .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  it('should add a name to the list using the form', () => {
    // element(by.css('bc-home form input')).sendKeys('Tim Berners-Lee');
    // element(by.css('bc-home form button')).click();
    //
    // expect(element(by.css('bc-home ul')).getText())
    //   .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });

});
