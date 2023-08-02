const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/username/:username', async (req, res) => {
    try {
        const employee = await Employees.findOne( {"Username": req.params.username } )
        if (!employee) {
            return res.status(404).send(`Employee ${req.params.username} not found`);
        }
        res.json(employee);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
    }

})
module.exports = router;