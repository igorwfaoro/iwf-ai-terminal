type ServiceConstructor<T> = new (...args: any[]) => T;

export class ServiceRegistry {
  private static services = new Map<ServiceConstructor<any>, any>();

  public static register<T>(constructor: ServiceConstructor<T>) {
    if (!ServiceRegistry.services.has(constructor)) {
      const instance = new constructor();
      ServiceRegistry.services.set(constructor, instance);
    }
  }

  static get<T>(serviceClass: ServiceConstructor<T>): T | undefined {
    return ServiceRegistry.services.get(serviceClass);
  }
}

export const Service = <T>() => {
  return function (constructor: ServiceConstructor<T>) {
    ServiceRegistry.register(constructor);
  };
};

export const Inject = <T>(serviceClass: ServiceConstructor<T>) => {
  return function (target: any, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      get: () => ServiceRegistry.get(serviceClass),
      enumerable: true,
      configurable: true
    });
  };
};
