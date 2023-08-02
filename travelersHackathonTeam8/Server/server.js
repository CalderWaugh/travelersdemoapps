//Reqired Code
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors= require('cors')
const connectDB = require('./dataAccess/db')
const {errorHandler} = require('./middleware/errorMiddleware')

//Port for API
const port = 4000

//Connect to the DB
connectDB()

//Set up the express server
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api/projects', require("./routes/projectRoutes"))
app.use('/api/users', require("./routes/userRoutes"))
app.use('/api/tasks', require('./routes/taskRoutes'))

app.use(errorHandler)
app.listen(port, ()=> console.log(`Server started in port ${port}`))