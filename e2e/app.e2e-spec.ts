import { NgBlogPage } from './app.po';

describe('ng-blog App', () => {
  let page: NgBlogPage;

  beforeEach(() => {
    page = new NgBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
