export type PlainFunction<T = any, K = any> = (params?: K) => T;

export type DynamicObject<T> = { [key: string]: T };
