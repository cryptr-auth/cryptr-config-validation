import {
  validIssuer,
  validClientId,
  validClientSecret,
  validRedirectUri,
  validAppBaseUrl
} from './index.ts'

// create a function into global context for Jest
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}

describe('valid Issuer', () => {
  it('should throw if no issuer is provided', () => {
    expect(() => validIssuer()).toThrowError('Your Cryptr URL issuer is missing.');
  });
  
  it('should throw if empty issuer is provided', () => {
    expect(() => validIssuer('')).toThrowError('Your Cryptr URL issuer is missing.');
  });
  
  it('should throw if insecured issuer is provided', () => {
    expect(() => validIssuer('http://localhost:3000'))
      .toThrowError("Your Cryptr URL issuer must start with https.Current value: http://localhost:3000. You can copy your domain from the Cryptr Developer ");
  });
  
  it('should warn if https is disabled', () => {
    validIssuer('http://localhost:3000', {disableHttpsCheck: true});
    expect(global.console.warn).toHaveBeenCalledWith( "Warning: HTTPS check is disabled." +
      "This allows for insecure configurations and is NOT recommended for production use.")
  });
  
  it('should throw if unchanged default issuer is provided', () => {
    expect(() => validIssuer('{yourCryptrDomain}', {disableHttpsCheck: true}))
      .toThrowError("Replace {yourCryptrDomain} with your Cryptr domain.");
  });
});

describe('validClientId', () => {
  it('should throw if no clientId is provided', () => {
    expect(() => validClientId()).toThrowError('Your client ID is missing.');
  });
  
  it('should throw if empty clientId is provided', () => {
    expect(() => validClientId('')).toThrowError('Your client ID is missing.');
  });
  
  it('should throw if unchanged default clientId is provided', () => {
    expect(() => validClientId('{client_id}'))
    .toThrowError('Replace {client_id} (client_id in cryptr.config.json) with the client ID of your Application.');
  });
});

describe('validClientSecret', () => {
  it('should throw if no client secret is provided', () => {
    expect(() => validClientSecret()).toThrowError('Your client secret is missing.');
  });
  
  it('should throw if empty client secret is provided', () => {
    expect(() => validClientSecret('')).toThrowError('Your client secret is missing.');
  });
  it('should throw if unchanged default client secret is provided', () => {
    expect(() => validClientSecret('{clientSecret}'))
      .toThrowError("Replace {clientSecret} with the client secret of your Application.");
  });
});

describe('validRedirectUri', () => {
  it('should throw if no redirect uri is provided', () => {
    expect(() => validRedirectUri()).toThrowError('Your redirect URI is missing.');
  });
  it('should throw if empty redirect uri is provided', () => {
    expect(() => validRedirectUri('')).toThrowError('Your redirect URI is missing.');
  });
  
  it('should throw if unchanged redirect uri is provided', () => {
    expect(() => validRedirectUri('{redirectUri}'))
      .toThrowError("Replace {redirectUri} with the redirect URI of your Application.");
  });
});

describe('validAppBaseUrl', () => {
  const protocolessUrl = 'localhost'
  const endingPathUrl = 'http://localhost/'

  it('should throw if no app base url is provided', () => {
    expect(() => validAppBaseUrl()).toThrowError('Your appBaseUrl is missing.');
  });
  
  it('should throw if empty app base url is provided', () => {
    expect(() => validAppBaseUrl("")).toThrowError('Your appBaseUrl is missing.');
  });
  
  it('should throw if empty app base url is provided', () => {
    expect(() => validAppBaseUrl('{appBaseUrl}'))
    .toThrowError("Replace {appBaseUrl} with the base URL of your Application.");
  });
  
  it('should throw if empty app base url is provided', () => {
    expect(() => validAppBaseUrl(protocolessUrl))
    .toThrowError(`Your appBaseUrl must contain a protocol (e.g. https://). Current value: ${protocolessUrl}.`);
  });
  it('should throw if empty app base url is provided', () => {
    expect(() => validAppBaseUrl(endingPathUrl))
    .toThrowError(`Your appBaseUrl must not end in a '/'. Current value: ${endingPathUrl}.`);
  });
});