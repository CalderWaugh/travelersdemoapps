//Created a model for the project collection
const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
    {
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please add a name for project']
        },

        teamSize: {
            type: Number,
            required: [true, 'Please add the team size of the project'],
            default: 1
        },

        budget: {
            type: Number, //check for other types
            required: [true, 'Please add the budget of the project (in dollars)'],
            default: 100
        },
        workload: {
            type: Number,
            required: [true, 'Please add the workload of the project'],
            default: 1
        },
        completionTime: { //make a date
            type: Number,
            required: [true, 'Please add the completion time in days'],
            default: 1
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Project', projectSchema)