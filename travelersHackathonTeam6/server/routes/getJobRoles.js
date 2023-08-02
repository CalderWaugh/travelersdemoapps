const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/', async (req, res) => {
    try {
        const jobRole = await Employees.distinct("JobRole");
        res.json(jobRole);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error finding all job roles ${err.message}`);
    }

})
module.exports = router;