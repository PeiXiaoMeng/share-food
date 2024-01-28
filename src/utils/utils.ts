import { http } from './http';



/**
 * 获取创建自增id方法，当返回值大于5时，返回0
 * @example
 * const createId = getCreateId();
 * createId(); // 0
 * createId(); // 1
 * ...
 */
export const getCreateId = () => (() => {
  let i = 0;
  return function() {
    if (i > 5) {
      i = 0;
    };
    return i++;
  }
})();