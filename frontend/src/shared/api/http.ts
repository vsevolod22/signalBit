export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
} as const;

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

export const HTTP_HEADER = {
  ACCEPT: 'Accept',
  CONTENT_TYPE: 'Content-Type',
} as const;

export const MEDIA_TYPE = {
  JSON: 'application/json',
} as const;

export const ACCEPT_JSON_HEADERS: Readonly<Record<string, string>> = {
  [HTTP_HEADER.ACCEPT]: MEDIA_TYPE.JSON,
};

export const JSON_HEADERS: Readonly<Record<string, string>> = {
  ...ACCEPT_JSON_HEADERS,
  [HTTP_HEADER.CONTENT_TYPE]: MEDIA_TYPE.JSON,
};
