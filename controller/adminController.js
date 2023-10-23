const jwt = require('jsonwebtoken');
const adminModel = require('../model/adminModel');
const teacherModel = require('../model/teacherModel');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const tutionModel = require('../model/tutionModel')
const  ContactModel = require('../model/contactform')

require("dotenv").config();
const key = process.env.key


const adminSignUp = async (req, res) => {
    try {
        // Get all data from body
        const { email, password } = req.body;

        // check if admin is already exist
        const Existadmin = await adminModel.findOne({ email });
        if (Existadmin) {
            res.send(400).send('Admin already exists')
        }
        // encrypt password
        const EncPassword = await bcrypt.hash(password, 10)
        // save admin in DB
        const admin = await adminModel.create({ email: email, password: EncPassword })
        // Generate a token for admin and send it
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            key, //process.env.jwt secret
            {
                expiresIn: '2h'
            }
        )
        // console.log("token", token)
        admin.token = token
        admin.password = undefined
        res.cookie('token', token); // Set as a cookie or send in the response body
        // res.json({ success: true, token });
        res.redirect('/admin')
    } catch (error) {
        res.redirect('/error')
        // console.log(error)
    }
}

const adminLogin = async (req, res) => {
    try {
        // Get all data from frontend
        const { email, password } = req.body
        // find user in db
        const admin = await adminModel.findOne({ email })
        // match the password 
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign(
                { id: admin.id },
                key, //process.env.jwtsecret
                { expiresIn: '2h' }
            )
            admin.token = token
            admin.password = undefined
            // cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //cookie expiration (3 * 24 * 60 * 60 * 1000) 3 days
                httpOnly: true
            }
            // Send the JWT token back to the client
            res.cookie('token', token); // Set as a cookie or send in the response body
            // res.json({ success: true, token });
            res.redirect('/admin')
        }
    } catch (error) {
        res.redirect('/error')
        // console.log(error)
    }
}

// visitor count finction
let visitorCount = 0;
const countVisitors = (req, res, next) => {
  if (req.originalUrl === '/') {
    visitorCount++;
  }
  next();
};


const adminData = async (req, res) => {
    try {
        // get index page visitor count
        const webcount = visitorCount++;

        // get all data from teacher model
        const teachers = await teacherModel.find({});

        // get last 5 data from teacher model  
        const modifiedTeachers = teachers.map((teacher) => {
            return {
                ...teacher._doc,
                resumePath: teacher.resumePath.replace(/\\/g, '/'),
                profilePath: teacher.profilePath.replace(/\\/g, '/'),
                idPath: teacher.idPath.replace(/\\/g, '/'),
            };
        });
        const lastFiveTeachers = modifiedTeachers.slice(-5);

        // get all data from tution model
        const tutions = await tutionModel.find({});
        // get last 5 data from tution model
        const lastFiveTutions = tutions.slice(-5);

        // get all data from contact form model
        const contacts = await ContactModel.find({});
        // get last 5 data from contact form model
        // const lastFiveContacts = contacts.slice(-5);

        res.render('admin',
            {
                webcount: webcount,
                teachers: teachers,
                modifiedTeachers: modifiedTeachers,
                lastFiveTeachers: lastFiveTeachers,
                tutions: tutions,
                lastFiveTutions: lastFiveTutions,
                contacts:contacts
            });
    } catch (error) {
        console.log(error)
        res.redirect('/error');
    }
};



module.exports = { adminSignUp, adminLogin, adminData };
