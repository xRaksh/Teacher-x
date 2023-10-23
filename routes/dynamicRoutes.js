const express = require('express');
const { upload } = require('../middleware/upload_Middleware');
const { handleFormSubmission } = require('../controller/teacherRegform');
const { adminSignUp,adminLogin } = require('../controller/adminController');
const { handleTution,contactformData } = require('../controller/hireController');


const router = express.Router();

// Form submission route with file uploads
router.post('/teacherreg', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profile', maxCount: 1 },
  { name: 'id', maxCount: 1 }
]), async (req, res) => {
  try {
    await handleFormSubmission.submitForm(req, res);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/teacherhire',handleTution)

router.post('/adminSignUp', adminSignUp);

router.post('/adminlogin',adminLogin);

router.post('/contact',contactformData)

module.exports = router;
