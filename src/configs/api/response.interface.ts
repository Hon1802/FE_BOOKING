interface ResponseInstant {
  message: string;
  error: boolean;
  code?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ReturnListResponse<T> extends ResponseInstant {
  data: Array<T>;
}
