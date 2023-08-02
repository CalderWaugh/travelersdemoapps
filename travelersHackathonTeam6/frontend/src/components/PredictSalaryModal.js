import React, { useState } from "react";
import { PREDICT_SALARY_URL } from "../api/urls";
import './style/PredictSalaryModal.css';

function PredictSalaryModal({ modal, toggleModal, jobRoles, workLocations }) {

  const [results, setResults] = useState();
  const [jobRole, setJobRole] = useState("");
  const [workLocation, setWorkLocation] = useState("");

  function handleJobRoleChange(event) {
    setJobRole(event.target.value);
  }

  function handleWorkLocationChange(event) {
    setWorkLocation(event.target.value);
  }

  function onSubmit() {
    // Call the handleSubmit function and pass the selected options
    if (!jobRole) {
      alert("Please select a Job Role")
      return
    }

    if(!workLocation) {
      alert("Please select a Work Location")
      return
    }

    handlePredictSubmit(jobRole, workLocation);
  }

  async function handlePredictSubmit(jobRole, workLocation) {
    let body = {
        "JobRole": jobRole,
        "WorkLocation": workLocation
    }
    let resp = await fetch(PREDICT_SALARY_URL, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    let res = await resp.json();

    setResults(res["salaryPrediction"])
}

  return (
    <>
      {modal && (
        <div className="predict-modal-simple">
          <div onClick={toggleModal} className="predict-overlay"></div>
          <div className="predict-modal-content">
            <h3>Predict Salary</h3>
            <select className="predict-select" value={jobRole} onChange={handleJobRoleChange} >
              <option value="">Choose a Job Role</option>
              {jobRoles.map((jobRole, index) => (
                <option key={index} value={jobRole}>{jobRole}</option>
              ))}
            </select>
            <select className="predict-select" value={workLocation} onChange={handleWorkLocationChange}>
              <option value="">Choose a Work Location</option>
              {workLocations.map((workLocation, index) => (
                <option key={index} value={workLocation}>{workLocation}</option>
              ))}
            </select>
            <button className="predict-button" onClick={onSubmit}>Submit</button>
            {results && <div className="predict-results" style={{'margin-top':'2em'}}><b>Predicted Salary:</b> {results}</div>}
            <button className='close-modal' onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PredictSalaryModal;
