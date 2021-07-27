import pubsub from './pubsub';

export type ProxyModelDataForm<T> = {
  action: string;
  data: T;
}

class ProxyModel<T extends object> {
  protected proxy: any;

  constructor (data: T) {
    this.proxy = new Proxy<T>({ ...data }, {
      get (target, property) {
        return (target[property as keyof T] as any)?.data;
      },
      set (target, property, value) {
        if (!(property in target)) {
          return false;
        }

        (target[property as keyof T] as any).data = value;
        pubsub.publish((target[property as keyof T] as any).action);
        return true;
      }
    });
  }

  getProxy () {
    return this.proxy;
  }
}

export default ProxyModel;
