const express = require('express');
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes with role authorization
router.post('/', protect, authorizeRoles('admin', 'instructor'), createCourse);
router.put('/:id', protect, authorizeRoles('admin', 'instructor'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin', 'instructor'), deleteCourse);

module.exports = router;