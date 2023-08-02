import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
// import {PythonShell} from 'python-shell';

// import navbar from './components/Navbar.js'

function Prediction() {

  const [value, setValue] = useState("Junior Software Engineer");
  const [value2, setValue2] = useState("Hartford, CT");
  let [salary, setSalary] = React.useState("");


  const handleChange = (e) => {
    console.log("job has been called")

    setValue(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log("job location has been called")
    setValue2(e.target.value2);
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log("submitted");
    // console.log(value);
    // console.log(value2);

    var raw = JSON.stringify({ job_role: value, work_location: value2 });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/prediction", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("inside prediction")
        // navigate("/search", {state:{id:1,name: username}});
        setSalary(result)

        console.log(result)
      })
      .catch((error) => console.log("error", error));

  };

  //   Job Roles: Junior Software Engineer, Senior Software Engineer, Junior Data Engineer, Senior Data Engineer, Cloud Engineer, HR Professional
  // Locations: Hartford CT, St Paul MN, Hunt Valley MD, New York NY

  return (
    <>
      {/* <navbar /> */}
      <div>
        <h1>Please select Job Role</h1>
        <form onSubmit={handleSubmit}>
          <select value={value} onChange={handleChange}>
            <option>Junior Software Engineer</option>

            <option>Senior Software Engineer</option>

            <option>Junior Data Engineer</option>
            <option>Senior Data Engineer</option>
            <option>Cloud Engineer</option>
            <option>HR Professional</option>
          </select>

          <h1>Please select Work Location</h1>
          <select value={value2} onChange={handleChange2}>
            <option>Hartford, CT</option>
            <option>Saint Paul, MN</option>
            <option>Hunt Valley, MD</option>
            <option>New York, NY</option>
          </select>
          <div className="button-container">
            <input type="submit" />
          </div>
          <p>{salary}</p>
        </form>
        <Link to="/search"> Search Directory </Link>

      </div>
    </>
  );
}

export default Prediction;
