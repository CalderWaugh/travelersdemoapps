// This will be the page to display the results of a search for employees
import {useState, useEffect} from 'react';
import {useParams, NavLink} from 'react-router-dom';

function isAlpha(string){
    const alphaRegEx = new RegExp('[a-zA-Z][a-zA-Z ]*')
    return alphaRegEx.test(string)
}

function Results(){
    let params = useParams();
    const [employees, setEmployees] = useState([]);
    const request = async (query) => {
        var url = (!isAlpha(query)? `http://localhost:4000/api/employees/${query}`: `http://localhost:4000/api/employeeName/${query}` );
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setEmployees(data)
            
        }).catch(error =>console.error(error));
    }

    useEffect(() =>{
        request(params.query)});
        //console.log("Data: ", employees);
    return(
        <div>
            <h1>{employees.length} Results for: "{params.query}"</h1>
            <br></br>
                            
                { employees.map(e =>{
                    return (<Block person = {e} > </Block>)
                }) }
       <p><NavLink to='/directory'>back</NavLink></p>
        </div>
        
    )
}
// This represents A single person found from a query. Results will render as many of them as needed.
function Block(props){
    return(
        <div>
            
            <h3>Employee Name: <NavLink to = {`/employee/${props.person.id}`}>{props.person.name}</NavLink></h3>
            <p>Employee id: <span>{props.person.id}</span></p>
            <hr></hr>
        </div>
    )
}
export default Results;