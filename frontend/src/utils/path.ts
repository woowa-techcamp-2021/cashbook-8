type QueryObject = {[key: string]: string | number | null };

const _buildQuerystring = (query: QueryObject): string => {
  const querystring = Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');

  return `?${querystring}`;
};

export const parsePath = (pathname: string): string => pathname.replace('/', '');

export const buildQuerystring = (query: QueryObject): string => {
  return _buildQuerystring(query);
};

export const buildURL = (baseURL: string, options: {
  query?: QueryObject | undefined,
  param?: string | number
}): string => {
  const { query, param } = options;
  let url = baseURL;

  if (param !== undefined) {
    url = `${url}/${param}`;
  }

  if (query !== undefined) {
    url = `${url}${_buildQuerystring(query)}`;
  }

  return url;
};
