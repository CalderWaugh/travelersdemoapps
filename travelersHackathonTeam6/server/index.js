require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const getEmployees = require('./routes/getEmployees')
const getEmployeeById = require('./routes/getEmployeeById')
const getEmployeeByUsername = require('./routes/getEmployeeByUsername')
const predictSalary = require('./routes/predictSalary')
const getJobRoles = require('./routes/getJobRoles')
const getLocations = require('./routes/getLocations')

const cors = require("cors");

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
app.use(express.json())

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.use('/employees', getEmployees)
app.use('/employees', getEmployeeById)
app.use('/employees', getEmployeeByUsername)
app.use('/employees', predictSalary)
app.use('/job-roles', getJobRoles)
app.use('/locations', getLocations)

app.listen(3100, ()=>console.log('server started in port 3100'))