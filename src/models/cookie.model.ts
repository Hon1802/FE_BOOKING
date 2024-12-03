export type ISetCookieOptions = {
  maxAge: number;
  domain: string;
  path: string;
  encode: string;
  expires: number;
  httpOnly: boolean;
  sameSite: string;
  secure: boolean;
};
export type IParseCookieOptions = {
  decode: string;
};
export type IDestroyCookieOptions = {
  domain: string;
  path: string;
};
