const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  deleteThought,
  updateThoughtById,
  createReaction,
  deleteReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// /api/students
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reactions').post(createReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;