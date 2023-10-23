const mongoose = require('mongoose');

// Define the schema
const teacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  resumePath: {
    type: String,
    required: true
  },
  profilePath: {
    type: String,
    required: true
  },
  idPath: {
    type: String,
    required: true
  },
  uniqueID: {
    type: String,
    required: true
  }
}, { timestamps: true }
);

// Create the model
const TeacherModel = mongoose.model('TeacherData', teacherSchema);

module.exports = TeacherModel;
