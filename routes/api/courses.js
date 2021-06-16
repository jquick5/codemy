const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Course = require('../../models/Course');
const User = require('../../models/User');

// @route   GET api/courses/me
// @desc    Get current users courses
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const course = await Course.find({ user: req.user.id }).populate('user', [
      'name',
      '_id',
    ]);

    if (!course) {
      return res
        .status(400)
        .json({ msg: 'There are no courses from this user' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('title', 'Title must be at least 5 characters').isLength({
        min: 5,
      }),
      check('description', 'Description is required').not().isEmpty(),
      check(
        'description',
        'Description must be between 10 and 50 characters',
      ).isLength({ min: 10, max: 50 }),
      check('imageUrl', 'imageUrl is required').not().isEmpty(),
      check('imageUrl', 'Must be a valid URL').isURL(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, imageUrl, isPublic, createdOn, enrolledUsers } =
      req.body;

    //Build Course Object
    const courseFields = {};
    courseFields.user = req.user.id;
    if (title) courseFields.title = title;
    if (description) courseFields.description = description;
    if (imageUrl) courseFields.imageUrl = imageUrl;
    if (isPublic) courseFields.isPublic = isPublic;
    if (createdOn) courseFields.createdAt = createdOn;
    if (enrolledUsers) courseFields.enrolledUsers = [enrolledUsers];

    try {
      let course = await Course.findOne({ title });

      if (course) {
        return res.status(400).json({
          errors: [{ msg: 'Course already exists, Please try another title' }],
        });
      }

      course = new Course(courseFields);
      course.save();
      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error...');
    }
  },
);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, imageUrl, isPublic, createdOn, enrolledUsers } =
    req.body;

  //Build Course Object
  const courseFields = {};
  courseFields.user = req.user.id;
  if (title) courseFields.title = title;
  if (description) courseFields.description = description;
  if (imageUrl) courseFields.imageUrl = imageUrl;
  if (isPublic) courseFields.isPublic = isPublic;
  if (createdOn) courseFields.createdAt = createdOn;
  if (enrolledUsers) courseFields.enrolledUsers = [enrolledUsers];

  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({ msg: 'Course does not exist' });
    }

    //Make sure only creator can update
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: courseFields },
      { new: true },
    );

    //course = new Course(courseFields);
    //course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('user', ['name', 'createdOn']);
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

// @route   GET api/courses/user/:user_id
// @desc    Get courses by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const courses = await Course.find({ user: req.params.user_id }).populate(
      'user',
      ['name', 'createdOn'],
    );

    if (!courses) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error...');
  }
});

// @route   GET api/courses/:id
// @desc    Get courses by course ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server Error...');
  }
});

// @route   DELETE api/courses
// @desc    Delete course
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Course Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

// @route   PUT api/courses/enroll/:id
// @desc    Enroll in a course
// @access  Private
router.put('/enroll/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    //Check if the user already enrolled in this course
    if (
      course.enrolledUsers.some(
        (course) => course.user.toString() === req.user.id,
      )
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already enrolled in this course' });
    }

    course.enrolledUsers.unshift({ user: req.user.id });

    await course.save();

    res.json(course.enrolledUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

// @route   PUT api/courses/unenroll/:id
// @desc    Unenroll in a course
// @access  Private
router.put('/unenroll/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    //Check if the user already enrolled in this course
    if (
      course.enrolledUsers.filter(
        (course) => course.user.toString() === req.user.id,
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have not enrolled into this course yet' });
    }

    const removedIndex = course.enrolledUsers
      .map((course) => course.user.toString())
      .indexOf(req.user.id);

    course.enrolledUsers.splice(removedIndex, 1);

    await course.save();

    res.json(course.enrolledUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

module.exports = router;
