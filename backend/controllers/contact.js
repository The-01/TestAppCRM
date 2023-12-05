// controllers/contactController.js
const contactService = require("../xrm/contactService");

async function renderGetContacts(req, res) {
    try {
        const contacts = await contactService.getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function renderGetContactById(req, res) {
    try {
        let contactId = req.params.id;
        const contact = await contactService.getContactById(contactId);
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function renderCreateContact(req, res) {
    try {
        let contactData = req.body;
        const contactId = await contactService.createContact(contactData);
        res.json({
            message: "Contact created successfully",
            contactId: contactId
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    renderGetContacts,
    renderGetContactById,
    renderCreateContact
};
