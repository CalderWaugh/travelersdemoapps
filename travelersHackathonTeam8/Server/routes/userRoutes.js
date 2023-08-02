const express = require('express')
const router = express.Router()
const {registerUser, getUser,getUserbyID, loginUser} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/:email', getUser)
router.get('/id/:id', getUserbyID)

module.exports = router