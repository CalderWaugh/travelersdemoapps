const express = require('express')
const router = express.Router()
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(protect, getTasks).post(protect, setTask)
router.route('/').get(getTasks).post(setTask)
// router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)
router.route('/:id').delete(deleteTask)
router.route('/:id').put(updateTask)
module.exports = router
