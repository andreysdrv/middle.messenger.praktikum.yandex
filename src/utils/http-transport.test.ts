import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './http-transport';

describe('HTTPTransport class', () => {
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    requests = [];
  });

  describe('GET requset', () => {
    it('should make GET request', () => {
      const transport = new HTTPTransport('/');

      transport.get();
      const request = requests[0];

      expect(request.method).to.eq('Get');
    });
  });

  describe('POST requset', () => {
    it('should make POST request', () => {
      const transport = new HTTPTransport('/');

      transport.post('/chats', { title: 'test' });
      const request = requests[0];

      expect(request.method).to.eq('Post');
    });
  });
  describe('PUT requset', () => {
    it('should make PUT request', () => {
      const transport = new HTTPTransport('/');

      transport.put('/users', { users: [0], chatId: 0 });
      const request = requests[0];

      expect(request.method).to.eq('Put');
    });
  });

  describe('DELETE requset', () => {
    it('should make DELETE request', () => {
      const transport = new HTTPTransport('/');

      transport.delete('/users', { users: [0], chatId: 0 });
      const request = requests[0];

      expect(request.method).to.eq('Delete');
    });
  });
});
