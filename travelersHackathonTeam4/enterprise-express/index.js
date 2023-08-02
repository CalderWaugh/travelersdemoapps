var express = require("express");
var dao = require("./mongo-dao.js");
var app = express();

app.use(express.json()); //Parse JSON body
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/api/employees", (req, res) => {
  dao.findAllEmployees((err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employees/:id", (req, res) => {
  dao.findEmployee(req.params.id, (err, employee) => {
    if (employee) {
      res.send(employee);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employeeName/:name", (req, res) => {
  dao.findEmployeeByName(req.params.name, (err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employeeLocation/:location", (req, res) => {
  dao.findEmployeeByLocation(req.params.location, (err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employeeRole/:role", (req, res) => {
  dao.findEmployeeByRole(req.params.role, (err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/estimatedSalary/:role/:location", (req, res) => {
  var data = {
    "estimatedSalary": {
      "role": req.params.role,
      "location": req.params.location,
    }
  };
  // Search up GraphQL
  dao.makePrediction(req.params.role, req.params.location, (err, salary) => {
    if (salary) {
      res.send(salary);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/films/:id/characters", (req, res) => {
  dao.findCharactersByFilm(req.params.id, (err, characters) => {
    if (characters) {
      res.send(characters);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.use(express.static('./public'));

// server start-up
const port = 4000;
console.log(
  "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port);
