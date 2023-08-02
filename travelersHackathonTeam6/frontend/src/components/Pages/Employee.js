import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Employee() {
    let params = useParams();
    return(
        <div>Employee {params.id}</div>
    )
}

export default Employee;