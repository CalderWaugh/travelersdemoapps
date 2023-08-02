import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function ManageProject(props){
    const baseUrl = "http://localhost:4000/api"
    const projectsUrl = `${baseUrl}/projects/${props.project._id}`
    const headers = { 'Content-type': 'application/json; charset=UTF-8'}
    function UpdateProject(projectJson){
        var updateJson ={
            method: 'PUT',
            body: JSON.stringify(projectJson),
            headers:headers
        }
        fetch(projectsUrl,updateJson)
        .then((response) => response.json())
        .then((json) => console.log(json)); 
        console.log(JSON.stringify(projectJson))
        console.log(`Project edit sucessfull`)
    }
    function DeleteProject(){
        var deleteJson = {
            method: 'DELETE'
        }
        fetch(projectsUrl,deleteJson)
        .then((response) => response.json())
        .then((json) => console.log(json)); 
        alert(`project ${props.project._id}  Delete sucessfull`)
    }
    function EditForm(props){
        var project = props.project
        const {register,handleSubmit} = useForm();
        return (
        <Popup trigger={<Button>Edit</Button>} position="right center">
            <Form onSubmit={handleSubmit((data) => UpdateProject(data))}>
                
                <Form.Label For="name">Project Name:</Form.Label>
                <Form.Control defaultValue={project.name} {...register("name")} />
                <Form.Label For="teamSize">Team Size:</Form.Label>
                <Form.Control defaultValue={project.teamSize}   {...register("teamSize")}/>
                <Form.Label For="budget">Project Budget:</Form.Label>
                <Form.Control defaultValue={project.budget}   {...register("budget")}/>
                <Form.Label For="workload">Workload:</Form.Label>
                <Form.Control defaultValue={project.workload}  {...register("workload")}/>
                <Form.Label For="completionTime">Completion Time:</Form.Label>
                <Form.Control defaultValue={project.completionTime}  {...register("completionTime")} />
                <Button variant="primary" type="submit">
                Edit
                </Button>
            </Form>
      </Popup>)
    }
    
    return (
        <div className='ManageProject'>
            <div>
            <EditForm project = {props.project}/>       
            <Button onClick = {DeleteProject}>Delete</Button>
            </div>
        </div>
    )
}

export default ManageProject