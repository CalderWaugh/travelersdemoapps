const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.post('/', async(req, res)=>{

    const validSearchParams = new Set(["Name","EmployeeNumber"])

    function validate() {
        for (let field in req.body) {
            if (!validSearchParams.has(field)) {
                return res.status(400).send(`Invalid Search Body, Available Fields to Search on: [${Array.from(validSearchParams).join(", ")}]`);
            }
        }
    }

    function buildSearchBody() {
        const searchParamBody = {};
        for (let field in req.body) {
            if (field === "Name") {
                searchParamBody[field] = {"$regex": req.body[field], "$options": "i"}
            }
            else {
                searchParamBody[field] = req.body[field]
            }
        }
        return searchParamBody;
    }

    try{

        const invalid = validate();
        if (invalid) {return invalid}

        const searchParamBody = buildSearchBody();
        const response = await Employees.find(searchParamBody)
        res.json(response)
    }
    catch(err){
        return res.status(err.status || 500).send(`Error getting employee: ${err.message}`);
    }

})
module.exports = router;