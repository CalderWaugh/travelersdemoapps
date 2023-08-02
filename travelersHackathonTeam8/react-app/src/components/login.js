import React, {useState, useEffect} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import {createStore} from 'state-pool';

const store = createStore();
store.setState("isLogin", false);
store.setState("user_id", undefined);

function Login(props) {

    const {register,handleSubmit} = useForm();
    const baseUrl = "http://localhost:4000/api"
    const[user, setUser] = useState([]);
    const [isLogin, setIsLogin] = store.useState("isLogin");
    const [user_id, setUser_id] = store.useState("user_id");
    const navigate = useNavigate();
    async function getUser(userJson){
        var user = await fetchUser(userJson)
        setUser(user);
        if(user?._id != undefined){
          setUser_id(user_id);
          setIsLogin(true);
          navigate(`/Home/${user._id}`,{replace:false})
        }
    } 
    async function fetchUser(userJson) {
      var userUrl = `${baseUrl}/users/login`;
      var loginJson ={
        method: 'POST',
        body: JSON.stringify(userJson),
        headers: { 'Content-type': 'application/json; charset=UTF-8'}
    }
    return await fetch(userUrl,loginJson)
    .then(res => res.json())

}
     async function login(userInfo){
        getUser(userInfo)
      }

    return(
      <div className="mb-3">
        <Form className="mb-3" onSubmit={handleSubmit((data) => login(data) )}>
                <Form.Label For="email">Email:</Form.Label>
                <Form.Control type = "email" {...register("email")} />
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control type="password" {...register("password")}/>
                <Button variant="primary" type="submit">
                  Log in
                </Button>
        </Form>
        <Link to ={`/Register`} > <Button>Sign up</Button></Link>
      </div>
    )
}
export default Login