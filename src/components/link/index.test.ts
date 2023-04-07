import { expect } from 'chai';
import sinon from 'sinon';
import { BaseLink as Link } from './index';
import Router from '../../utils/router';

describe('Link', () => {
  it('should render', () => {
    new Link({ to: '/', label: 'label', router: {} as typeof Router });
  });

  it('should render passed label', () => {
    const label = 'Home page';
    const link = new Link({ to: '/', label, router: {} as typeof Router });

    expect(link.element?.textContent).to.eq(label);
  });

  it('element should return span', () => {
    const label = 'Home page';
    const link = new Link({ to: '/', label, router: {} as typeof Router });
    const { element } = link;

    expect(element).to.be.instanceof(window.HTMLSpanElement);
  });

  it('should go to passed route on click', () => {
    const label = 'Home page';
    const cb = sinon.stub();
    const to = '/';
    const link = new Link({ to, label, router: { go: cb } as unknown as typeof Router });
    const element = link.element as HTMLSpanElement;

    element.click();

    expect(cb.calledWith(to)).to.eq(true);
  });
});
