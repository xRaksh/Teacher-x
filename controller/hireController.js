const ContactModel = require("../model/contactform");
const tutionModel = require("../model/tutionModel");

const handleTution = async (req, res) => {
    try {
        const { fullname, phone, email, message } = req.body;

        function generateUniqueID() {
            const prefix = "StudentX";
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            const uniqueID = prefix + randomSuffix;
            return uniqueID;
        }

        // Example usage
        const studentID = generateUniqueID();
        // console.log(studentID);
        const data = await tutionModel.create({
            fullname: fullname,
            phone: phone,
            email: email,
            message: message,
            uniqueID: studentID
        })
        // console.log(data)
        // res.send("Success")
        return res.redirect('/')
    } catch (error) {
        res.redirect('/error')
    }
}

const contactformData = async (req, res) => {
    try {
        const { email, message } = req.body;
        const data = await ContactModel.create({
            email: email,
            message: message
        })
        
        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { handleTution, contactformData };