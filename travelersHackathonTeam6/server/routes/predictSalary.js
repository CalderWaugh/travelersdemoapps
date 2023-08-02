const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');
let Employees = require('../schemas/Employees')


router.post('/predict-salary', async (req, res) => {
  const role = req.body['JobRole'];
  const location = req.body['WorkLocation'];

  // Check if required fields are present
  if (!role || !location) {
    return res.status(400).json({ error: 'Missing jobRole or WorkLocation' });
  }

  // Check if jobRole and location are valid
  const validJobRoles = await Employees.distinct("JobRole");
  const validLocations = await Employees.distinct("WorkLocation");

  if (!validJobRoles.includes(role) || !validLocations.includes(location)) {
    return res.status(400).json({ error: 'Invalid jobRole or WorkLocation' });
  }

  try {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      args: [role, location]
    };

    PythonShell.run('predict_salary.py', options).then((messages) => {
      const prediction = messages[0];
      const responseBody = {
        salaryPrediction: prediction
      };
      return res.status(200).json(responseBody);
    });
  } catch (err) {
    console.error(err);
    returnres.status(500).json({ error: `Error predicting salary: ${err.message}` });
  }
});

module.exports = router;
