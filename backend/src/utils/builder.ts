type BuilderType<T> = {
  [k in keyof T]: (arg: T[k]) => BuilderType<T>
} & {
  build: () => T
}

const Builder = <T>(): BuilderType<T> => {
  const data: T = {} as T;

  const builder: any = new Proxy(
    {},
    {
      get (_, property) {
        if (property === 'build') {
          return () => data;
        }

        return (value: any) => {
          data[property as keyof T] = value;

          return builder;
        };
      }
    }
  );

  return builder;
};

export default Builder;
