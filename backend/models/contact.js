// models/contact.js
class Contact {
    constructor(
        id,
        fullName,
        email,
        phone,
        jobTitle,
        parentAccountId,
        parentAccountName
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.parentAccountId = parentAccountId;
        this.parentAccountName = parentAccountName;
    }
}

module.exports = {
    Contact
};
