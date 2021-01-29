class ConfigurationValidationError extends Error {}
import { CryptrTestingConfig } from './interfaces'
import { DEFAULT_TESTING_CONFIG, isHttps, hasProtocol, endsInPath } from './defaults'

export const validIssuer = (issuer: string = '', testing: CryptrTestingConfig = DEFAULT_TESTING_CONFIG) => {
  const copyMessage = "You can copy your domain from the Cryptr Developer ";

  if (testing.disableHttpsCheck) {
    const httpsWarning =
      "Warning: HTTPS check is disabled." +
      "This allows for insecure configurations and is NOT recommended for production use.";
    /* eslint-disable-next-line no-console */
    console.warn(httpsWarning);
  }

  if (!issuer || issuer == '') {
    throw new ConfigurationValidationError("Your Cryptr URL issuer is missing.");
  } else if (!testing.disableHttpsCheck && !issuer.match(isHttps)) {
    throw new ConfigurationValidationError(
      "Your Cryptr URL issuer must start with https." +
        `Current value: ${issuer}. ${copyMessage}`
    );
  } else if (issuer.match(/{yourCryptrDomain}/)) {
    throw new ConfigurationValidationError(
      "Replace {yourCryptrDomain} with your Cryptr domain."
    );
  }
};

export const validClientId = (clientId: string = '') => {
  if (!clientId || clientId == '') {
    throw new ConfigurationValidationError("Your client ID is missing.");
  } else if (clientId.match(/{client_id}/)) {
    throw new ConfigurationValidationError(
      `Replace ${clientId} (client_id in cryptr.config.json) with the client ID of your Application.`
    );
  }
};

export const validClientSecret = (clientSecret: string = '') => {
  if (!clientSecret || clientSecret == '') {
    throw new ConfigurationValidationError("Your client secret is missing.");
  } else if (clientSecret.match(/{clientSecret}/)) {
    throw new ConfigurationValidationError(
      "Replace {clientSecret} with the client secret of your Application."
    );
  }
};

export const validRedirectUri = (redirectUri: string = '') => {
  if (!redirectUri || redirectUri == '') {
    throw new ConfigurationValidationError("Your redirect URI is missing.");
  } else if (redirectUri.match(/{redirectUri}/)) {
    throw new ConfigurationValidationError(
      "Replace {redirectUri} with the redirect URI of your Application."
    );
  }
};

export const validAppBaseUrl = (appBaseUrl: string = '') => {
  if (!appBaseUrl || appBaseUrl == '') {
    throw new ConfigurationValidationError("Your appBaseUrl is missing.");
  } else if (appBaseUrl.match(/{appBaseUrl}/)) {
    throw new ConfigurationValidationError(
      "Replace {appBaseUrl} with the base URL of your Application."
    );
  } else if (!appBaseUrl.match(hasProtocol)) {
    throw new ConfigurationValidationError(
      `Your appBaseUrl must contain a protocol (e.g. https://). Current value: ${appBaseUrl}.`
    );
  } else if (appBaseUrl.match(endsInPath)) {
    throw new ConfigurationValidationError(
      `Your appBaseUrl must not end in a '/'. Current value: ${appBaseUrl}.`
    );
  }
};
