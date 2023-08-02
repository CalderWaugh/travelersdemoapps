//Created a model for the project collection
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },

        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        manager: {
            type: Boolean,
            required: [true, 'Is this user a manager'],
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)