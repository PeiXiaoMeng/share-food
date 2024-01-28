/** Dependency Injection 依赖注入 */

interface InjectConfig {
  /** 是否是单例的，默认为true */
  singleton?: boolean;
}

/** 默认注入配置项 */
const defaultInjectConfig = {
  singleton: true
}

interface Provider {
  provider: any;
  config: InjectConfig;
}

export class Injector {
  private readonly providerMap: WeakMap<any, any> = new WeakMap();
  private readonly instanceMap: WeakMap<any, any> = new WeakMap();
  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) this.providerMap.set(key, value);
  }
  public getProvider(key: any): Provider {
    return this.providerMap.get(key);
  }
  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
  public getInstance(key: any): any {
    if (this.instanceMap.has(key)) return this.instanceMap.get(key);
    return null;
  }
  public setValue(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
}

export const rootInjector = new Injector();

export function Injectable(config: InjectConfig = {}): (_constructor: any) => any {
  config = {
    ...defaultInjectConfig,
    ...config
  };
  return function (_constructor: any): any {
    rootInjector.setProvider(_constructor, { provider: _constructor, config });
    return _constructor;
  };
}

export function Inject(propertyType: any) {
  return function (target: any, propertyName: string): any {
    const injector: Injector = rootInjector;

    let providerInsntance;
    if (typeof propertyType === 'function') {
      const _provider = injector.getProvider(propertyType);
      if (_provider.config.singleton) {
        providerInsntance = injector.getInstance(propertyType);
        if (!providerInsntance) {
          const providerClass = _provider.provider;
          providerInsntance = new providerClass();
          injector.setInstance(propertyType, providerInsntance);
        }
      } else {
        const providerClass = _provider.provider;
        providerInsntance = new providerClass();
      }
    } else {
      providerInsntance = propertyType;
    }
    target[propertyName] = providerInsntance;

    return target[propertyName];
  };
}
