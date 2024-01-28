import Taro from '@tarojs/taro';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { Domain, Suffix } from './const';

/** 请求方法 */
declare type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

export const request = (config: any) => {
  return new Observable(observer => {
    Taro.request({
      dataType: 'text',
      responseType: 'text',
      ...config,
      success: ({ data }) => {
        let result: any;
        try {
          result = JSON.parse(data);
        } catch (e) {
          result = data;
        }
        console.log(result);
        if (result.code === 200) {
          observer.next({
            result: result.data,
          })
        } else {
          observer.error({
            errCode: result.code,
          })
        }
      },
      fail: ({ errMsg }) => observer.error({ errCode: '', errMsg }),
      complete: () => observer.complete()
    });
  })
}

/**
 * 获取请求方法
 * @param method 请求方式
 */
const getMethodRequest = (method: Method) => (url: string, params: any = {}, config: any): any => {
  if (config.showLoading) Taro.showLoading({ title: config.loadingText || 'loading', mask: config.loadingMask });
  return new Observable((observer) => {
    of(config).pipe(
      switchMap(() => {
        return request({
          url: Domain + Suffix + url,
          method,
          data: params,
          mode: 'cors',
          ...config,
        })
      })
    ).subscribe(observer);
  }).pipe(
    tap(
      // 成功
      ({ header, result, errCode }) => {
        console.log(`【${url}】返回值：>>>`, result, `traceId: ${header && (header['x-b3-traceid'] || header['X-B3-TraceId'] || '')}`);
      },
      // 报错
      ({ errCode, errMsg, header }) => {

      },
      // 完成
      () => {
      }
    ),
  );
};


/** 需要认证的请求 */
export const http = {
  get: getMethodRequest('GET'),
  post: getMethodRequest('POST'),
  put: getMethodRequest('PUT'),
  delete: getMethodRequest('DELETE')
}
