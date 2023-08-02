//Routes for the project collection
const express = require('express')
const router = express.Router()

const{getProjects, getProject, getProjectsEmail, setProjectEmail, editProject, setProject, deleteProject} = require('../controllers/projectController')

router.route('/:managerID').get(getProjects).post(setProject)
router.route('/email/:email').get(getProjectsEmail).post(setProjectEmail)
router.route('/:id').put(editProject).delete(deleteProject)
router.route('/get/:id').get(getProject)

module.exports = router