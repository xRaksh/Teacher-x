const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile') {
      cb(null, 'uploads/Uprofile/');
    } else if (file.fieldname === 'resume') {
      cb(null, 'uploads/Uresume/');
    } else if (file.fieldname === 'id') {
      cb(null, 'uploads/Uid/');
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

module.exports = {upload};
