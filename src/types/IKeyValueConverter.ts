export interface IKeyValueConverter<T, K extends keyof T = keyof T> {
  key: K;
  value: T[K];
}
