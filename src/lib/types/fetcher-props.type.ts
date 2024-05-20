export interface FetcherProps<T, TParam = T> {
  url: string;
  data?: unknown;
  normalizer?: (_data: TParam) => T;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  method: string;
}
