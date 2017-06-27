import { FlightsPage } from './app.po';

describe('flights App', () => {
  let page: FlightsPage;

  beforeEach(() => {
    page = new FlightsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
