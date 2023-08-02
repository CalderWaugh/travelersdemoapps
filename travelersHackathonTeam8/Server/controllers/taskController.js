//CRUD Functions for the project collection
const asyncHandler = require('express-async-handler')

const Task = require('../models/tasksModel')
const User = require('../models/userModel')

// Get Request - /api/tasks/project/:id
const getTaskByProject = asyncHandler( async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const tasks = await Task.find({project: req.params.id})
    res.status(200).json(tasks)
})

// Get Request - /api/tasks/get/:id
const getTask = asyncHandler( async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const tasks = await Task.findOne({_id: req.params.id})
    res.status(200).json(tasks)
})

// Get Request - /api/tasks/id/:id
const getTaskByUserID = asyncHandler( async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const tasks = await Task.find({assignee: req.params.id})
    res.status(200).json(tasks)
})

// Get Request - /api/tasks/email/:email
const getTaskByUserEmail = asyncHandler( async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const user = await User.findOne({email:req.params.email})
    const tasks = await Task.find({assignee: user._id})
    res.status(200).json(tasks)
})

// Post Request - /api/tasks/project/:id
const setTask = asyncHandler (async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if(!req.body.email){
        res.status(400)
        throw new Error('Please fill out all fields')
    }
    const email = req.body.email
    const user = await User.findOne({email})

    const task = await Task.create({
        description: req.body.description,
        duration: req.body.duration,
        due: req.body.due,
        done: req.body.done,
        project: req.params.id,
        assignee: user._id
    })
    res.status(201).json(task)
})

// Put Request - /api/tasks/:id
const editTask = asyncHandler (async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Project not found')
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedTask)
})

// delete Request - /api/tasks/:id
const deleteTask =  asyncHandler (async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Project not found')
    }
    console.log(task)
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})
 

module.exports = {
    getTaskByProject,
    getTaskByUserID,
    getTaskByUserEmail,
    setTask,
    getTask,
    editTask,
    deleteTask
}