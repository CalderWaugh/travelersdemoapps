const express = require('express');
const bodyParser = require('body-parser');
var dao = require("./server");
const {PythonShell} = require('python-shell');
var cors = require("cors")

// import { registerUser } from './server';

// server app
var app = express();

//Parse JSON body
app.use(bodyParser.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) // Use this after the variable declaration

// get employees
app.get("/Employee", async (req, res) => {
    //button event 
    await dao.findEmployees((result)=>{
        console.log("result: " + result);
        res.send(result);
    })
});

// get employee by ID
app.get("/Employee/:id", async (req, res) => {
    //button event 
    await dao.findEmployeeByID(req.params.id, (result)=>{
        console.log("result: " + result);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
});

app.post("/register", async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let phone = req.body.phone_number;
    let role = req.body.job_role;
    let location = req.body.work_location;
    let salary;

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'C:/Users/wasadmin/Desktop/er/searchable_enterprise_directory/Back/data_science',
        args: [role, location] 
    };
 
    await PythonShell.run('predict_salary.py', options).then(results=>{
        salary = parseInt(parseInt(results[1]))
    });
    //button event
    await dao.register(name, password, phone, role, location, salary, (result)=>{
        res.send(result);
    })
});

app.post("/login", async (req, res) => {
    id = req.body.employee_id
    console.log(id)
    pw = req.body.password
    //button event 
    await dao.login(id, pw, (result)=>{
        console.log("result: " + result);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
});

app.post("/prediction", async (req, res) =>{
    let role = req.body.job_role;
    let location = req.body.work_location;
    let salary;

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'C:/Users/wasadmin/Desktop/er2/searchable_enterprise_directory/Back/data_science',
        args: [role, location] 
    };
 
    await PythonShell.run('predict_salary.py', options).then(results=>{
        salary = parseInt(results[1])
        console.log(salary)
    });
    //button event
    res.send(salary.toString());
});


// start the rest service
var port = 4000;
console.log('service opening on port: ' + port)
app.listen(port);