import { useDispatch } from 'react-redux'
import { deleteTask} from '../features/tasks/taskSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TaskItem({ task }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const editThis =(tas)=>{
    localStorage.setItem('task', JSON.stringify(tas))
    const task = JSON.parse(localStorage.getItem('task'));
    console.log(task._id + "here");
    navigate('/update')
  }

  return (
    <div className='goal'>
      <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
      <h2>{task.description}</h2>
      <p>{task.user}</p>
      <p>{task.teamSize}</p>
      <p>{task.Budget}</p>
      <p>{task.Workload}</p>
      <p>{task.completionTime}</p>
      <p>{task.complete}</p>
      <p>{task.personAssigned}</p>
      <p>{task.dueDate}</p>
      <p>{task._id}</p>
      <p>{task.estimatedDuration}</p>
      <p>{task.estimatedDuration}</p>
<>
      {(user?.email === 's@gmail.com') &&
      <>
      <button onClick={()=>editThis(task) }>edit</button>
      
       <button onClick={()=>dispatch(deleteTask(task._id)) }className='close'>x</button>
       </> 
      }
      {(user?.email === 'bob@gmail.com') &&
      <>
      <button onClick={()=>editThis(task) }>edit</button>
      
       <button onClick={()=>dispatch(deleteTask(task._id)) }className='close'>x</button>
       </>       
      }
      {(user?.email === 'me@123') &&
      <>
      <button onClick={()=>editThis(task) }>edit</button>
      
       <button onClick={()=>dispatch(deleteTask(task._id)) }className='close'>x</button>
       </> 
      }
      </>
      
    </div>
  )
}

export default TaskItem
