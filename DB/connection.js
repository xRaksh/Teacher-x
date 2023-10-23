const mongoose = require("mongoose")
require("dotenv").config();
const DB = process.env.DB
const PASS = process.env.PASS
const URL = `mongodb+srv://varun:${PASS}@abhi.ba1das3.mongodb.net/${DB}?retryWrites=true&w=majority`


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successful");
}).catch((e) => {
    console.log(e);
})