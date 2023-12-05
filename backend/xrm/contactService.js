// contacts.js
const crmHelper = require("../utils/crmHelper");
const { Contact } = require("../models/contact");

// Function to fetch CRM contacts data using fetchXML
async function getContacts() {
    const fetchXml = `<fetch>
        <entity name="contact">
            <attribute name="address1_telephone1" />
            <attribute name="emailaddress1" />
            <attribute name="fullname" />
            <attribute name="jobtitle" />
            <attribute name="parentcustomerid" />
            <filter>
                <condition attribute="parentcustomerid" operator="not-null" />
            </filter>
        </entity>
    </fetch>`;

    // Make a request to CRM API with fetchXML for contacts
    const data = await crmHelper.fetchCrmData("contacts", fetchXml);

    // Map JSON data to Contact model properties directly
    const contacts = data.map((json) => {
        const parentAccountName =
            json[
                "_parentcustomerid_value@OData.Community.Display.V1.FormattedValue"
            ] || null;

        return new Contact(
            json.contactid,
            json.fullname || null,
            json.emailaddress1 || null,
            json.telephone1 || null,
            json.jobtitle || null,
            json._parentcustomerid_value || null,
            parentAccountName
        );
    });

    return contacts;
}

async function getContactById(contactId) {
    const fetchXml = `<fetch>
        <entity name="contact">
            <attribute name="address1_telephone1" />
            <attribute name="emailaddress1" />
            <attribute name="fullname" />
            <attribute name="jobtitle" />
            <attribute name="parentcustomerid" />
            <filter>
                <condition attribute="parentcustomerid" operator="not-null" />
            </filter>
            <filter>
                <condition attribute="contactid" operator="eq" value="${contactId}" />
            </filter>
        </entity>
    </fetch>`;

    // Make a request to CRM API with fetchXML for contacts
    const data = await crmHelper.fetchCrmData("contacts", fetchXml);

    // Map JSON data to Contact model properties directly
    const contact = data.map((json) => {
        const parentAccountName =
            json[
                "_parentcustomerid_value@OData.Community.Display.V1.FormattedValue"
            ] || null;

        return new Contact(
            json.contactid,
            json.fullname || null,
            json.emailaddress1 || null,
            json.telephone1 || null,
            json.jobtitle || null,
            json._parentcustomerid_value || null,
            parentAccountName
        );
    });

    return contact;
}

async function createContact(contactData) {
    // Define the contact data
    const contactRecord = {
        // Add your contact properties here
        firstname: contactData.firstName,
        lastname: contactData.lastName,
        emailaddress1: contactData.email,
        address1_telephone1: contactData.phone,
        telephone1: contactData.phone,
        mobilephone: contactData.phone,
        jobtitle: contactData.jobTitle,
        ["parentcustomerid_account@odata.bind"]: `/accounts(${contactData.parentAccountId})`
    };

    // Call the function to create a contact record in crm
    await crmHelper
        .postCrmData("contacts", contactRecord)
        .then((createdContact) => {
            console.log(
                `Contact with id '${createdContact.contactid}' created successfully`
            );
            return createdContact.contactid;
        })
        .catch((error) => {
            console.error("Error creating contact:", error.message);
        });
}

module.exports = {
    getContacts,
    getContactById,
    createContact
};
