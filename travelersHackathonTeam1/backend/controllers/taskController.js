const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')
const User = require('../models/userModel')


const getTasks = asyncHandler(async (req, res) => {
  // const task = await Task.find({ user: req.user?.id })
  //const taskidd = await Task.findById(req.query.id  )
  // const taskid = await Task.find({ user: req.query.id  })
  const taskid = await Task.find({  })
  // const taskdes = await Task.find({ id: req.query.id })
  console.log(JSON.stringify(taskid) + " get task id");

  if(taskid){
    res.json(taskid)
  }
  // if(taskidd){
  //   res.json(taskidd)
  // }
  
  // console.log(JSON.stringify(req.query.id));
  // console.log(JSON.stringify(task))
  // const task = await Task.find({ user: req.data.usename })
  // res.json(task)
})


const getTasksByid = asyncHandler(async (req, res) => {
  // const task = await Task.find({ user: req.user?.id })
  
  
  const taskid = await Task.find({ id: req.query.id })
  console.log(JSON.stringify(taskid) + " get task id");
  // console.log(JSON.stringify(taskdes) + " get task des");
  if(taskid){
    res.json(taskid)
  }
  // console.log(JSON.stringify(req.query.id));
  // console.log(JSON.stringify(task))
  // const task = await Task.find({ user: req.data.usename })
  // res.json(task)
})


const setTask = async (req, res) => {
  // if (!req.body.description) {
  //   res.status(400)
  //   throw new Error('Please add a description')
  // }
  console.log(JSON.stringify({
    description: req.body.description,
    user: req.body.username,
    teamSize: req.body.teamSize,
    budget: req.body.budget,
    workload: req.body.workload,
    completionTime: req.body.completionTime,
    
    complete: req.body.complete,
    personAssigned: req.body.personAssigned,
    dueDate: req.body.dueDate,
    estimatedDuration: req.body.estimatedDuration
  }));
  const task = await Task.create({
    description: req.body.description,
    user: req.body.username,
    teamSize: req.body.teamSize,
    budget: req.body.budget,
    workload: req.body.workload,
    completionTime: req.body.completionTime,
    
    complete: req.body.complete,
    personAssigned: req.body.personAssigned,
    dueDate: req.body.dueDate,
    estimatedDuration: req.body.estimatedDuration

  })

  res.status(200).json(task)
}


const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)


  console.log(JSON.stringify(req.params.id) + "here");
  console.log(JSON.stringify(req.body.description) + "task description here");
   const description= req.body.description
    const user = req.body.username
    const teamSize = req.body.teamSize
    const budget = req.body.budget
    const workload =req.body.workload
    const completionTime = req.body.completionTime
    
    const complete = req.body.complete
    const personAssigned =req.body.personAssigned
    const dueDate = req.body.dueDate
    const estimatedDuration =req.body.estimatedDuration
  

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the task user
  // if (task.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id,
     
    {
       description: req.body.description,
       user : req.body.username,
       teamSize : req.body.teamSize,
       budget : req.body.budget,
      workload : req.body.workload,
      completionTime : req.body.completionTime,
      
       complete : req.body.complete,
     personAssigned :req.body.personAssigned,
       dueDate  :req.body.dueDate,
       estimatedDuration :req.body.estimatedDuration,
    }, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  console.log("delete called" + JSON.stringify(req.params.id));
  console.log(JSON.stringify(task) + "task");
  if (!task) {
    res.status(400)
    throw new Error('task not found')
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the task user
  // if (task.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  await task.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTasks,
  setTask,
  updateTask,
  getTasksByid,
  deleteTask,
}
