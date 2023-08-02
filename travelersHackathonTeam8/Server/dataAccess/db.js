const mongoose = require('mongoose')

const URL = 'mongodb://127.0.0.1:27017/ProjectManagementApp'
const URL2 = 'mongodb://localhost:27017/ProjectManagementApp'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(URL)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB