import HTTPError from '../../error/http-error';
import cookie from '../utils/cookie';
import { buildURL } from '../utils/path';

type Options = {
  headers?: { [key: string]: string },
  query?: { [key: string]: string | number },
  param?: string | number
}

type BodyOptions = {
  body: unknown
} & Options;

export const getAccessToken = (): string => {
  const token = cookie.get('accessToken');
  if (token === undefined) {
    throw new HTTPError(401);
  }

  return token;
};

export const getRequest = async <T>(url: string, options: Options): Promise<T> => {
  const { headers, query, param } = options;

  const requestURL = buildURL(url, {
    query,
    param
  });

  const res = await fetch(requestURL, {
    method: 'GET',
    headers
  });

  const { status } = res;
  if (HTTPError.isHTTPError(status)) {
    throw new HTTPError(status);
  }

  return res.json();
};

export const postRequest = async <T>(url: string, options: BodyOptions): Promise<T> => {
  const { headers, query, param, body } = options;

  const requestURL = buildURL(url, {
    query,
    param
  });

  const res = await fetch(requestURL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const { status } = res;
  if (HTTPError.isHTTPError(status)) {
    throw new HTTPError(status);
  }

  return res.json();
};

export const putRequest = async <T>(url: string, options: BodyOptions): Promise<T> => {
  const { headers, query, param, body } = options;

  const requestURL = buildURL(url, {
    query,
    param
  });

  const res = await fetch(requestURL, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });

  const { status } = res;
  if (HTTPError.isHTTPError(status)) {
    throw new HTTPError(status);
  }

  return res.json();
};

export const deleteRequest = async <T>(url: string, options: Options): Promise<T> => {
  const { headers, query, param } = options;

  const requestURL = buildURL(url, {
    query,
    param
  });

  const res = await fetch(requestURL, {
    method: 'DELETE',
    headers
  });

  const { status } = res;
  if (HTTPError.isHTTPError(status)) {
    throw new HTTPError(status);
  }

  return res.json();
};
