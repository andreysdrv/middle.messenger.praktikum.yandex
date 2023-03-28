import { expect } from 'chai';
// import sinon from 'sinon';
import { BaseLink as Link } from './index';
import Router from '../../utils/router';

describe('Link', () => {
  // it('should render', () => {
  //   new Link({ to: '/', label: 'label', router: {} as typeof Router });
  // });

  it('should render passed label', () => {
    const label = 'Home page';
    const link = new Link({ to: '/', label, router: {} as typeof Router });

    expect(link.element?.textContent).to.eq(label);
  });
});
