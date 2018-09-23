/* eslint no-underscore-dangle: ["error", { "allow": ["_tokenId", "_secret"] }] */

/**
 * Mux Base Class - Simple base class to be extended by all child modules.
 *
 * @property {string} tokenId - The ID for the access token.
 * @property {string} tokenSecret - The secret for the access token.
 * @property {Object} requestOptions - The HTTP request options for Mux Assets
 * @property {string} requestOptions.auth.username - HTTP basic auth username (access token)
 * @property {string} requestOptions.auth.password - HTTP basic auth password (secret)
 *
 */
class Base {
  constructor(...params) {
    if (params[0] && params[0].tokenId) {
      this.tokenId = params[0].tokenId;
      this.tokenSecret = params[0].tokenSecret;
      return this;
    }

    this.tokenId = params[0] || process.env.MUX_TOKEN_ID;
    this.tokenSecret = params[1] || process.env.MUX_TOKEN_SECRET;
  }

  set tokenId(token) {
    this._tokenId = token;

    if (typeof this._tokenId === 'undefined') {
      throw new Error('API Access Token must be provided.');
    }
  }

  get tokenId() {
    return this._tokenId;
  }

  set tokenSecret(secret) {
    this._secret = secret;

    if (typeof this._secret === 'undefined' || this._secret === '') {
      throw new Error('API secret key must be provided');
    }
  }

  get tokenSecret() {
    return this._secret;
  }

  get requestOptions() {
    return {
      auth: {
        username: this.tokenId,
        password: this.tokenSecret,
      }
    }
  }
}

module.exports = Base;
