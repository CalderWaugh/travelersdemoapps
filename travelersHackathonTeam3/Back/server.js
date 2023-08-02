
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/Org';

// Database Name
const dbName = 'Org';
let db;

const client = new MongoClient(url);
console.log('here');
let col;
try {
    client.connect();
    console.log('we have connected')
    db = client.db("Org");
    col = db.collection("EmployeeDB");

    
    
} catch (e) {
    console.error(e);
}

// console.log(x)

//finds all employees
module.exports.findEmployees = async function (callback) {
    callback(await col.find().toArray())
  };

module.exports.findEmployeeByID = async function (id, callback) {
    id = parseInt(id)
    temp = (await col.find({employee_id: id}).toArray())
    callback(temp)
  };

module.exports.register = async function (name, password, phone, role, location, salary, callback) {
    count = (await col.countDocuments())
    new_id = count + 10000
    console.log(salary)

    temp = {
        "name": name,
        "password": password,
        "employee_id": new_id,
        "phone_number": phone,
        "job_role": role,
        "work_location": location,
        "salary": salary,
        "manager_id": "", 
    }
    let object = {
        "message": "Succesfull insert",
        "UserID": new_id
    }
    await col.insertOne(temp)
    callback(object)
  };

module.exports.login = async function (userID, password, callback) {
    id = parseInt(userID)
    pw = password
    let validpw;
    let man_id = [];

    valid = await col.find({employee_id: id}).toArray()
    if (valid == ''){
        console.log("invalid userID, enter correct one or register if first time")
        callback("1")
        //invalid userID, enter correct one
    }else{
        temp = await col.find({employee_id: id}, {_id: 0, password: 1}).toArray();
        validpw = temp[0].password
        if (validpw != pw){
            console.log("Incorrect password, try again")
            callback("2")
        }else{
            console.log("Welcome")
            man = await col.find({manager_id: id}, {_id: 0, employee_id:1}).toArray()
            r = valid[0].job_role
            console.log(r)
            if (r.includes("HR") && r.includes("Manager")){
                man_id[0] = "HR"
            }else if (r.includes("Manager") || r.includes("CEO")){
                man_id[0] = "yes"
                for (let i = 0; i < 19; i++){
                    man_id[i + 1] = man[i].employee_id
                }
            }else{
                man_id[0] = "no"
            }
            //console.log(man)
            callback(man_id)
        }
    }
  };