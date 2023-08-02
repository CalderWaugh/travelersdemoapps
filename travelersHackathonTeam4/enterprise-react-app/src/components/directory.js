import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom';
var init = {
    placeholder: "Enter a name or id",
    query: ""
}
function Directory(){
    const [state, setState] = useState(init);
    const navigate = useNavigate();


    let Change = (e) =>{
        state["query"] = e.currentTarget.value;
        console.log(e.currentTarget.value)
        setState({...state})
    }
    let Click = (e) =>{
        if (state.query !="") {navigate(`/search/${state.query}`)}
    }
    return(
        <div>
            <SearchArea {...state} Change={Change} Click={Click}/>
        </div>
    )
}

function SearchArea(props){
   
    return(
        <div>
            <h4>Enter a name or id: </h4>
            <form>
                <input type = {'text'} name = 'dir_search' id = 'dir_search' placeholder = {props.placeholder} onChange={props.Change} ></input><br/><br/>
                <input type = {'button'} name = 'dir_search' value = {'search'} onClick={props.Click}></input>
            </form>
        </div>
    )
}

export default Directory;