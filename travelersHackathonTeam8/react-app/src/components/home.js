import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ManageProject from '../manageproject';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';



 function Home(){
    const baseUrl = "http://localhost:4000/api"
    const[projects, setProjects] = useState([]);
    const[user, setUser] = useState([])
    const{_id} = useParams();

     async function getProjects(){
        var projects = await fetchProjects()
        setProjects(projects);
    }
    async function getUser(){
        var user = await fetchUser()
        setUser(user);
    } 
    

    async function fetchProjects() {

        var ProjectsUrl = `${baseUrl}/projects/${_id}`;
        return await fetch(ProjectsUrl)
        .then(res => res.json())

  }
  
async function fetchUser() {
    var ProjectsUrl = `${baseUrl}/users/id/${_id}`;
    return await fetch(ProjectsUrl)
    .then(res => res.json()) 
    }
    useEffect(() => {getProjects()}, []);
    useEffect(() => {getUser()},[])
    var uniqueProjectId = [];
    const ProjectsHtml = projects.map((project) =>{
        if((project != null) && (!uniqueProjectId.includes(project._id))){ 
            uniqueProjectId.push(project._id)
            return (
            <div>
            <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
            <Accordion.Header>
            <Link to ={`/project/${project._id}`} > 
                <h4>
                    {project.name}
                </h4>
            </Link>
            </Accordion.Header>
    
            <Accordion.Body>
                <p1>Team Size : {project.teamSize}<br></br></p1>
                <p1> Budget : {project.budget}<br></br></p1>
                <p1> Workload : {project.workload} <br></br></p1>
                <p1> Completion Time : {project.completionTime}<br></br></p1>
                {/*<p1>Contributors : {project.contributors.toString()}<br></br></p1>*/}
                <Task _id = {project._id}/>
           </Accordion.Body>
           </Accordion.Item>
           </Accordion>
           {user?.manager?<ManageProject project = {project}/>:""}
           
        </div>)
         }
    }
    
 );

    return(
        <div className='Home'>
            <section clasName= "user">
                <h4>  
                    <Badge bg="primary">
                        {user.name}
                    </Badge>
                </h4>
            </section>
            <h3>Projects</h3>
            {ProjectsHtml}
            {user?.manager?<AddProject _id = {_id}/> : "No Manager Access"}
        </div>
    )

}
function Task(props){
    const baseUrl = "http://localhost:4000/api"
    const[tasks, setTasks] = useState([]);
     async function getTasks(){
        var tasks = await fetchProjectTask()
        setTasks(tasks);
    }
    async function fetchProjectTask() {
        var ProjectsUrl = `${baseUrl}/tasks/project/${props._id}`;
        return await fetch(ProjectsUrl)
       .then(res => res.json())
  }
    useEffect(() => {getTasks()}, []);
    
    const TasksHtml = tasks.map((task) =>
        <p1>task: {task.description}<br></br></p1>);
    return(
        <div>
            {TasksHtml}
        </div>
    )

}
function AddProject(props){
    const {register,handleSubmit} = useForm();
    const baseUrl = "http://localhost:4000/api"
    const projectUrl = `${baseUrl}/projects/${props._id}`
    const headers = { 'Content-type': 'application/json; charset=UTF-8'}
    function createProject(projectJson){
        var createJson ={
            method: 'POST',
            body: JSON.stringify(projectJson),
            headers:headers
        }
        fetch(projectUrl,createJson)
        .then((response) => response.json())
        .then((json) => console.log(json)); 
        console.log(JSON.stringify(projectJson))
        console.log(`Task created sucessfull`)
    }
    return (
    <Popup trigger={<Button>Create Project</Button>} position="right center">
        <Form onSubmit={handleSubmit((data) => createProject(data))}>
                <Form.Label For="name">Project Name:</Form.Label>
                <Form.Control  {...register("name")} />
                <Form.Label For="teamSize">Team Size:</Form.Label>
                <Form.Control  {...register("teamSize")}/>
                <Form.Label For="budget">Project Budget:</Form.Label>
                <Form.Control    {...register("budget")}/>
                <Form.Label For="workload">Workload:</Form.Label>
                <Form.Control  {...register("workload")}/>
                <Form.Label For="completionTime">Completion Time:</Form.Label>
                <Form.Control   {...register("completionTime")} />
                <Form.Control type="submit" />
        </Form>
  </Popup>)
}

export default Home;