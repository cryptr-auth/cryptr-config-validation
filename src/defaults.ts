export const DEFAULT_TESTING_CONFIG = {
  disableHttpsCheck: false,
};

export const isHttps = new RegExp("^https://");
export const hasProtocol = new RegExp("://");
export const endsInPath = new RegExp("/$");