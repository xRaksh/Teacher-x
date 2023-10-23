const express = require('express');
const { checkAuth } = require('../middleware/auth');
const path = require('path');
const { adminData } = require('../controller/adminController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index")
});

router.get('/login', (req, res) => {
    res.render("login")
});

router.get('/success', (req, res) => {
    const teacherID = req.query.teacherID;
    res.render('success', { teacherID });
});


router.get('/teacherreg', (req, res) => {
    res.render("TeacherReg")
});

router.get('/teachhire', (req, res) => {
    res.render("hire")
});

router.get('/adminup',checkAuth, (req, res) => {
    res.render("signup")
});

router.get('/admin', checkAuth, adminData);

router.get('/error', (req, res) => {
    const filePath = path.join(__dirname, '../public/error.html');
    res.sendFile(filePath);
});

// Logout route handler
router.get('/logout', (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie('token');
    res.redirect('/login');
  });
  



module.exports = router;