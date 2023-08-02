//Created a model for the project collection
const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, 'Please add a name for project']
        },

        duration: {
            type: Number,
            required: [true, 'Please add the estimated duration of the task in days'],
            default: 1
        },

        due: {
            type: Date, //check for other types
            required: [true, 'Please add the due date'],
        },
        done: {
            type: Boolean,
            required: [true, 'Please add the workload of the project'],
            default: false
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Task', taskSchema)