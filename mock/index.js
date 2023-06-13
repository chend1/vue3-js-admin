import Mock from 'mockjs';
import { param2Obj } from '@/utils/index';
import login from './data/login';

const mocks = [...login];

export function mockXHR() {
  // 处理参数
  function xhrParams(respond) {
    return (options) => {
      let result = null;
      const { body, type, url } = options;
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url),
      });
      return Mock.mock(result);
    };
  }
  mocks.forEach((item) => {
    Mock.mock(new RegExp(item.url), item.type, xhrParams(item.response));
  });
}
