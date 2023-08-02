//Routes for the project collection
const express = require('express')
const router = express.Router()

const{getTask, getTaskByProject, getTaskByUserID, getTaskByUserEmail, editTask, setTask, deleteTask} = require('../controllers/taskController')

router.route('/project/:id').get(getTaskByProject).post(setTask)
router.route('/id/:id').get(getTaskByUserID)
router.route('/get/:id').get(getTask)
router.route('/email/:email').get(getTaskByUserEmail)
router.route('/:id').put(editTask).delete(deleteTask)

module.exports = router