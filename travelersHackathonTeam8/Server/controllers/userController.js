//imports
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //encrypt hashed password in mongodb

//CRUD Functions for the project collection

// Post Request - /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    //check for password
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            manager: user.manager
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Login')
    }

})


// Post Request (Register User) - /api/users
const registerUser = asyncHandler (async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {name, email, password, manager} = req.body
    if(!name || !email || !password ){
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPass,
        manager: manager

    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            manager: user.manager,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

    res.json({message: 'Register User'})
})

// Get Request - /api/users/:email
const  getUser = asyncHandler (async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const email = req.params.email
    const user = await User.findOne({email})

    //check for password
    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            manager: user.manager
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Login')
    }
})

// Get Request - /api/users/id/:id
const  getUserbyID = asyncHandler (async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = req.params.id
    const user = await User.findOne({_id: req.params.id})

    //check for password
    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            manager: user.manager
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Login')
    }
})

module.exports = {
    loginUser,
    registerUser,
    getUser,
    getUserbyID
}