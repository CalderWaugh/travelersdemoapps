const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      
      ref: 'User',
    },
    teamSize: {
      type: Number,
      
    },
    budget: {
      type: Number,
     
    },
    workload: {
      type: String,
     
    },
    completionTime: {
      type: Number,
     
    },
    description: {
      type: String,
     
    },
    complete: {
      type: Number,
     
    },
    personAssigned: {
      type: String,
    
    },
    dueDate: {
      type: String,
      
    },
    estimatedDuration: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
