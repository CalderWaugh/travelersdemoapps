import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function Login(props) {
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [managers, setManagers] = React.useState("");

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    // console.log(username);
    // console.log(password);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');


    var raw = JSON.stringify({ employee_id: username, password: password });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("here")

        if (result[0] == "yes"){
          setManagers(result)
        }

        navigate("/search", {state:{id:1,name: username, reports: result}});

        console.log(result)
      })
      .catch((error) => console.log("error", error));

    // var raw = JSON.stringify({
    //   employee_id: username,
    //   password: password
    // });

    // var requestOptions = {
    //   method: "POST",
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("http://localhost:4000/login", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/search", { replace: true });
    //   })
    //   .catch((error) => console.log("MealScreen food-log error", error));
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Enter your ID </label>
          <input
            type="text"
            name="uname"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        <Link to="/Register"> Register </Link>
      </div>
    </div>
  );
}

export default Login;
