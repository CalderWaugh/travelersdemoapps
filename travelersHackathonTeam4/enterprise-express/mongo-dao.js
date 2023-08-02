const mongodb = require("mongodb"); // mongo client library
const {PythonShell} = require('python-shell');
const url = "mongodb://localhost:27017/hackathon";
let dbPool;

mongodb.MongoClient.connect(url, function (err, db) {
  if (!err) {
    dbPool = db.db("hackathon");
  } else {
    console.log("DB CONNECTION FAILED. Is database running?");
  }
});

module.exports.findAllEmployees = async function (callback) {
  var col = dbPool.collection("company");
  col.find().toArray(async(err, characters) => {
    if (!err) {
      callback(null, characters);
    } else {
      callback("Failed to find employees", undefined);
    }
  });
};

// retrieve single character
module.exports.findEmployee = async function (id, callback) {
  var col = dbPool.collection("company");
  col.find({ id: +id }).toArray(async(err, employee) => {
    if (!err) {
      callback(null, employee[0]);
    } else {
      callback("Failed to find employee", undefined);
    }
  });
};

// retrieve employees by name
module.exports.findEmployeeByName = async function (name, callback) {
  var col = dbPool.collection("company");
  col.find({ name: {'$regex': name, '$options': 'i'}}).toArray(async(err, employees) => {
    if (!err) {
      callback(null, employees);
    } else {
      callback("Failed to find employee", undefined);
    }
  });
};

// retrieve employees by location
module.exports.findEmployeeByLocation = async function (location, callback) {
  var col = dbPool.collection("company");
  col.find({ location: {'$regex': location, '$options': 'i'}}).toArray(async(err, employees) => {
    if (!err) {
      callback(null, employees);
    } else {
      callback("Failed to find employee", undefined);
    }
  });
};

// retrieve employees by role
module.exports.findEmployeeByRole = async function (role, callback) {
  var col = dbPool.collection("company");
  col.find({ role: {'$regex': role, '$options': 'i'}}).toArray(async(err, employees) => {
    if (!err) {
      callback(null, employees);
    } else {
      callback("Failed to find employee", undefined);
    }
  });
};

module.exports.makePrediction = async function (role, locn, callback) {
  var col = dbPool.collection("salaries");
  console.log(role);
  console.log(locn);
  col.find({Location: {'$regex': locn, '$options': 'i'}}).toArray(async(err, salaries) => {
    if (!err) {
      console.log(salaries[0][role]);
      callback(null, {salary: salaries[0][role]});
    } else {
      callback("Failed to find salary", undefined);
    }
  });
};







