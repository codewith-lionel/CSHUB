const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Achievement', 'Research', 'Event', 'Announcement', 'Publication'],
    default: 'Announcement'
  },
  imageUrl: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);