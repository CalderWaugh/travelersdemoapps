const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    employeeNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    workLocation: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    employeeManager: {
        type: String,
        required: true
    }

})

const collectionName = 'employees';
module.exports = mongoose.model("Employee", EmployeeSchema, collectionName)