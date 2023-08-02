const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/', async (req, res) => {
    try {
        const location = await Employees.distinct("WorkLocation");
        res.json(location);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error finding all work locations ${err.message}`);
    }

})
module.exports = router;