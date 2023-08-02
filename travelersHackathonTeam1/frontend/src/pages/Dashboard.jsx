import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({description: '',teamSize: '',budget:'',workLoad:''})
  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    const getPosts = async(user) =>{
      // const data = (await fetch(`posts/?id=${user._id}`)).json();
      // console.log(JSON.stringify(data))
      // setPosts(data);
      await fetch(`posts/?id=${user?.email}`)
      .then(res => res.json())
      .then(text => setPosts(text));
    }

    console.log(JSON.stringify(user?.email) + "dashbord")
    getPosts(user);
    //dispatch(getTasks(user))
    // console.log(user.email + 'Dashboard');
    // dispatch(getTasks())
    // const response = await fetch('/posts/',{
    //   method: "GET",
    //     headers: {
    //       // Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     // data: JSON.stringify({username: "bob"})
      
    //   })
    //   console.log(response.data)
      
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  function TaskReturn({task}){
    if(task.user === user?._id){
      //console.log(task + "taskReturn");
    return<TaskItem key={task._id} task={task} />
    }
    else{
      return<div></div>
    }
  }
  
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>you can only add a project and task if you are a manager</p>
        
      </section>
      {(user?.email === 's@gmail.com') &&
      
      <TaskForm />

      }
      {(user?.email === 'bob@gmail.com') &&
      <TaskForm />
      }
      {(user?.email === 'me@123') &&
      <TaskForm />
      }
      

      <section className='content'>
        {posts?.length > 0 ? (
          <div className='goals'>
            {posts.map((task) => (

<TaskItem key={task._id} task={task} />
          
          
          )

  
        )}
          </div>
        ) : (
          <h3>You have not set any task</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard


// return (
//   <>
//     <section className='heading'>
//       <h1>Welcome {user && user.name}</h1>
//       <p>Tasks Dashboard</p>
//     </section>

//     <TaskForm />

//     <section className='content'>
//       {tasks.length > 0 ? (
//         <div className='goals'>
//           {tasks.map((task) => (


//         <TaskItem key={task._id} task={task} />
        
//         )


//       )}
//         </div>
//       ) : (
//         <h3>You have not set any task</h3>
//       )}
//     </section>
//   </>
// )