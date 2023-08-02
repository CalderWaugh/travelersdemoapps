import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function EmployeePage(){
    const params = useParams();
    const [employee, setEmployee] = useState({})
    const [cookies, setCookie, removeCookie] = useCookies();

    const request = async (query) => {
        var url = `http://localhost:4000/api/employees/${query}`;
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setEmployee(data[0])
            
        }).catch(error =>console.error(error));
    }
    useEffect(()=> {
        request(params.query);
        //console.log(employee);
    })
    return (
        <div>
            <h1>{employee.name}</h1><br/>
            <p>id: {employee.id}<span style = {{float:"right"}}> {employee.location}</span></p>
            <hr/><br/>
            <p>Phone number: {employee.phone}</p>
            <p>Role: {employee.role}</p>
            <p>Salary: {((cookies.role == "HR" || cookies.user == employee.name)? employee.salary: "RESTRICTED")} </p>

        </div>
    )

}


export default EmployeePage;