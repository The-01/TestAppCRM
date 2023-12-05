// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRoute = require("./routes/contact");

const app = express();
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());

// Use contact route
app.use("/contacts", contactRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
