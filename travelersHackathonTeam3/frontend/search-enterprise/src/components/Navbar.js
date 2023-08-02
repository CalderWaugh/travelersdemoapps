import React from 'react';
import {  Link } from "react-router-dom";

const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Search Employee Directory</Link>
    </li>
    <li>
      <Link to="/cats">Predictive Model</Link>
    </li>
    <li>
      <Link to="/sheeps">Profile</Link>
    </li>

  </div>
  );
}
export default navbar;