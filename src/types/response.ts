export type ResponseType<T> =
  | { success: true; data: T }
  | { success: false; message: string; statusCode: number };
