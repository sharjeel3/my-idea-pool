import { request } from './index';
import moxios from 'moxios';

describe('Request lib', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return response on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'response'
      });
    });
    expect(await request({ url: '/url' })).toEqual([null, 'response']);
  });

  it('should return error when failed', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        response: {
          status: 500,
          statusText: 'Server problem',
          data: 'failed'
        }
      });
    });
    expect(await request({ url: '/url' })).toEqual([
      {
        status: 500,
        statusText: 'Server problem',
        data: 'failed'
      },
      null
    ]);
  });
});
