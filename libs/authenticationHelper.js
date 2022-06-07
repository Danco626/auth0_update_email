`use strict`;
const auth0 = require("auth0");
const { appConfig } = require('../config/config');

/** @type {import('auth0').AuthenticationClient} */
let authClient;

/** @type {import('auth0').ManagementClient} */
let mgmtClient;

/**Adds a authentication API client to req.authAPIClient. */
const getAuthClient = () => {
  if (!authClient) { 
    const auth0Client = auth0.AuthenticationClient;
    
    authClient = new auth0Client({
      domain: appConfig.auth0Domain,
      clientId: appConfig.clientId,
      clientSecret: appConfig.clientSecret,
    });
  }

  return authClient;  
}

const getMgmtClient = () => {
  if (!mgmtClient) { 
    const auth0MgmtClient= auth0.ManagementClient;
    
    mgmtClient = new auth0MgmtClient({
      domain: appConfig.auth0Domain,
      clientId: appConfig.mgmtClientId,
      clientSecret: appConfig.mgmtClientSecret,
    });
  }

  return mgmtClient;  
}

module.exports = { getAuthClient, getMgmtClient };
