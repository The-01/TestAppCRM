// authHelper.js
require("dotenv").config();
const { ConfidentialClientApplication } = require("@azure/msal-node");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const authorityHost = process.env.AUTHORITY_HOST;
const authority = `${authorityHost}/${tenantId}`;
const resource = process.env.RESOURCE;

const msalConfig = {
    auth: {
        clientId,
        authority,
        clientSecret
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

const tokenRequest = {
    scopes: [`${resource}/.default`]
};

let accessToken;

// Function to get the access token
async function getAccessToken() {
    try {
        const authResult = await cca.acquireTokenByClientCredential(
            tokenRequest
        );
        accessToken = authResult.accessToken;
        return accessToken;
    } catch (error) {
        console.error("Error acquiring token:", error);
        throw error;
    }
}

module.exports = {
    getAccessToken
};
