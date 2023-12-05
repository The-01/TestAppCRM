// crmDataFetcher.js
const axios = require("axios");
const { getAccessToken } = require("./authHelper");

const apiUrl = process.env.API_URL;
const apiVersion = process.env.API_VERSION;

// Function to fetch CRM data using fetchXML
async function fetchCrmData(entityCollectionName, fetchXml) {
    // Call the function to get the access token
    const accessToken = await getAccessToken();

    // Check if accessToken is available
    if (!accessToken) {
        console.error("Access token not available.");
        return null;
    }

    // Define Axios config with the access token
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            Prefer: "odata.include-annotations=OData.Community.Display.V1.FormattedValue,return=representation"
        }
    };

    // Make a request to CRM API with fetchXML
    try {
        const response = await axios.get(
            `${apiUrl}/api/data/${apiVersion}/${entityCollectionName}?fetchXml=${encodeURIComponent(
                fetchXml
            )}`,
            config
        );
        return response.data.value;
    } catch (error) {
        console.error("Error fetching CRM data:", error.message);
        throw error;
    }
}

// Function to post (create) a contact in CRM
async function postCrmData(entityCollectionName, recordData) {
    // Call the function to get the access token
    const accessToken = await getAccessToken();

    // Check if accessToken is available
    if (!accessToken) {
        console.error("Access token not available.");
        return null;
    }

    // Define Axios config with the access token
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            Prefer: "odata.include-annotations=OData.Community.Display.V1.FormattedValue,return=representation"
        }
    };

    const body = JSON.stringify(recordData);

    // Make a request to CRM API to create a record
    try {
        const response = await axios.post(
            `${apiUrl}/api/data/${apiVersion}/${entityCollectionName}`,
            body,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error posting contact to CRM:", error.message);
        throw error;
    }
}

module.exports = {
    fetchCrmData,
    postCrmData
};
