const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: 1,
    max: 6,
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['Undergraduate', 'Graduate', 'Doctoral'],
    default: 'Undergraduate',
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    trim: true,
  },
  instructor: {
    type: String,
    trim: true,
  },
  schedule: {
    type: String,
    trim: true,
  },
  room: {
    type: String,
    trim: true,
  },
  prerequisites: {
    type: String,
    trim: true,
  },
  syllabus: {
    type: String,
    trim: true,
  },
  maxStudents: {
    type: Number,
    min: 1,
  },
  enrolledStudents: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

courseSchema.index({ courseCode: 1, title: 1 });

module.exports = mongoose.model('Course', courseSchema);
