import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';

var init = {
    placeholder: "Enter a name or id",
    query: ""
}

function LoginPage(props){
    const [state, setState] = useState(init);
    const [employee, setEmployee] = useState([]);
    const [cookies, setCookies] = useCookies(["user", "role", "id"]);
    
    const request = async (query) => {
        var url = (`http://localhost:4000/api/employeeName/${query}` );
        await fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setCookies('user',data[0].name, {path:'/'});
            setCookies('role', data[0].role, {path:'/'});
            setCookies('id', data[0].id, {path:'/'});
        });
   
    }

    let Change = (e) =>{
        state["query"] = e.currentTarget.value;
        //console.log(e.currentTarget.value)
        setState({...state});
    }
    async function Click(e){
       await request(state.query);
        console.log(cookies);
    }

    

    return (
        <div>
            <h1>Sign in: </h1>

            {<form>
                <label for= "login">Name or id:</label>
                <input type = {'text'} name = 'login' id = 'login' onChange={Change} ></input><br/><br/>
                <input type = {'button'} name = 'login_submit' value = {'Login'} onClick = {Click}></input>
            </form>}
        </div>
    )

}

export default LoginPage;