// routes/contact.js
const express = require("express");
const contacts = require("../controllers/contact");

const router = express.Router();

// router.get("/", contacts.renderContacts);
// router.get("/:id", contacts.renderContactById);

router
    .route("/")
    .get(contacts.renderGetContacts)
    .post(contacts.renderCreateContact);
router.route("/:id").get(contacts.renderGetContactById);

module.exports = router;
