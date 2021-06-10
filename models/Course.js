const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  enrolledUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
