import { DonaldplsFrontendPage } from './app.po';

describe('donaldpls-frontend App', function() {
  let page: DonaldplsFrontendPage;

  beforeEach(() => {
    page = new DonaldplsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
