import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Managetask from './managetask.js'
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';



 function Project(){
    const baseUrl = "http://localhost:4000/api"
    const[project, setProject] = useState([]);
    const{projectId} = useParams();

     async function getProject(){
        var project = await fetchProject()
        setProject(project);
    }
    async function fetchProject() {
        var ProjectsUrl = `${baseUrl}/projects/get/${projectId}`;
        return await fetch(ProjectsUrl)
        .then(res => res.json())

  }
    useEffect(() => {getProject()}, []);
    
    return(
        <div>
        <h3>Project Name : {project.name}</h3>
        <h3>Team Size : {project.teamSize}</h3>
        <h3> Budget : {project.budget}</h3>
        <h3> Workload : {project.workload} </h3>
        <h3> Completion Time : {project.completionTime}</h3>
       {/*<h3>Contributors : {project.contributors?.toString()}</h3>*/}
        {project?._id == undefined?"":<Tasks _id = {project._id}/>}
        {project?._id == undefined?"":<AddTask _id = {project._id}/>}
        </div>
    )

}

function Tasks(props){
    const baseUrl = "http://localhost:4000/api"
    const projectTasksUrl   = `${baseUrl}/tasks/project/${props._id}`
    const[tasks, setTasks] = useState([]);
     async function getTasks(){
        var tasks = await fetchProjectTask()
        setTasks(tasks);
    }
    async function fetchProjectTask() {
        
         return await fetch(projectTasksUrl)
        .then(res => res.json())     
  }
    useEffect(() => {getTasks()}, []);
    
    const TasksHtml = tasks.map((task) =>
        <div>
            <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
            <Accordion.Header>
            {/*<h3>task: {task.taskname}</h3>*/}
            <h4>{task.description}</h4>
            </Accordion.Header>
            <Accordion.Body>
                <p1> Assignment: {task.assignee}</p1>
                <p1> Due Date: {task.due} </p1>
                <p1> Duration (estimated): {task.duration}</p1>
                <p1> Completed: {String(task.done)}</p1>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Managetask task = {task}/>
        </div>)
    return(
        <div>
            {TasksHtml}
        </div>
    )

}
function AddTask(props){
    const {register,handleSubmit} = useForm();
    const baseUrl = "http://localhost:4000/api"
    const projectTaskUrl = `${baseUrl}/tasks/project/${props._id}`
    const headers = { 'Content-type': 'application/json; charset=UTF-8'}
    function createTask(taskJson){
        var createJson ={
            method: 'POST',
            body: JSON.stringify(taskJson),
            headers:headers
        }
        fetch(projectTaskUrl,createJson)
        .then((response) => response.json())
        .then((json) => console.log(json)); 
        console.log(JSON.stringify(taskJson))
        console.log(`Task created sucessfull`)
    }
    return (
    <Popup trigger={<Button>Create Task</Button>} position="right center">
        <Form onSubmit={handleSubmit((data) => createTask(data))}>
                <Form.Label For="task">Task:</Form.Label>
                <Form.Control  {...register("description")}/>
                <Form.Label For="email">email of assignee:</Form.Label>
                <Form.Control {...register("email")}/>
                <Form.Label For="due">Due Date:</Form.Label>
                <Form.Control  {...register("due")}/>
                <Form.Label For="duration">duration:</Form.Label>
                <Form.Control   {...register("duration")} />
                <Form.Control type="submit" />
        </Form>
  </Popup>)
}

export default Project;