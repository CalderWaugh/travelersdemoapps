import React, { useState} from "react";
import './EmployeeTile.css'
import './Modal.css'

function EmployeeTile({employee, canViewSalary}) {

    const[modal, setModal] = useState(false);
    const[salary, setSalary] = useState(false);

    const toggleModal = () => {
        if (modal === false) {
            let canView = canViewSalary(employee)
            setSalary(canView);
        }
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div onClick={toggleModal}>
            {employee && 
                <div onClick={toggleModal} className='tile'>
                    <div className="icon" style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}><img src={require('./person-icon.png')}></img></div>
                    <div className='name' style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>Name: {employee.Name}</div>
                    <div className='phoneNum' style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>Phone Number: {employee.PhoneNumber}</div>
                    <div className='role' style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>Role: {employee.JobRole}</div>
                </div>
            }

            {modal && (
            <div className="modal-simple">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                {employee && 
                <div onClick={toggleModal} >
                    <div className='modal-data'><b>Name: </b>{employee.Name}</div>
                    <div className='modal-data'><b>Phone Number: </b>{employee.PhoneNumber}</div>
                    <div className='modal-data'><b>Job Role: </b>{employee.JobRole}</div>
                    <div className='modal-data'><b>Work Location: </b>{employee.WorkLocation}</div>
                    <div className='modal-data'><b>Employee Manager: </b>{employee.EmployeeManager}</div>
                    <div className='modal-data'><b>Salary: </b>{salary ? employee.Salary : <span style={{ 'font-style': "italic"}}>Locked</span>}</div>
                </div>
                }
                    <button className='close-modal' onClick={toggleModal}>Close</button>
                </div>
            </div>
            )}

        </div>
        
    )
}

export default EmployeeTile;
