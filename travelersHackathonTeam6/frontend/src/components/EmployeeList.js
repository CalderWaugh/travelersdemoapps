import React from "react";
import EmployeeTile from "./EmployeeTile";
import './style/EmployeeList.css';

function EmployeeList({employees, canViewSalary}) {

    const employeesList = employees && employees.map( (employee) => {
     return <EmployeeTile 
        key={employee._id}
        employee={employee} 
        canViewSalary={canViewSalary}
    /> }
    )

    return (
        <div>
            <div className="employee-list">{employeesList}</div>
        </div>
    )

}

export default EmployeeList;