require('dotenv').config();

const appConfig = {
  port: process.env.PORT,
  auth0Domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  mgmtClientId: process.env.MGMT_CLIENT_ID,
  mgmtClientSecret: process.env.MGMT_CLIENT_SECRET,
};

const authConfig = {  
    
      session: { 
        rollingDuration: process.env.SESSION_ROLLING_DURATION
      },
      authRequired: true,
      idpLogout: true,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      secret: process.env.SECRET,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      routes: {
        postLogoutRedirect: process.env.BASE_URL        
      },
      authorizationParams: {
        response_type: "code",
        // audience: `https://${process.env.AUTH0_MGMT_DOMAIN}/mfa/`,
        // scope:
        //   "openid profile email enroll read:authenticators remove:authenticators offline_access",
      },
};

module.exports = { appConfig, authConfig };