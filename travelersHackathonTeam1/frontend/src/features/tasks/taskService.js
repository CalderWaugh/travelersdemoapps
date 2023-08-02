import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
const API_URL = '/posts/'




const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'accept' : 'application/json'
    },
  }
  const formdata = new FormData();
  // console.log(taskData.description);
  formdata.append("description", taskData.description)
  const {response} = await axios.post(API_URL, 
    
    formdata, config)

  return response.data
}


const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`/posts`,{
    params:{ username: user._id

    },
  }, config)
  // console.log(JSON.stringify(response.data) + "task services");

  return response.data
}

// const getTasks = async (token, user) => {
//   console.log(user + "taskServices");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get('/posts', config)

//   return response.data
// }

// const getTasks = async (user) => {
//   // const config = {
//   //   headers: {
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   // }
//   const response = await fetch('/posts',{
//     method: "GET",
//       headers: {
//         // Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     body: JSON.stringify({username: user})
    
//     })
//   // const response = await axios.get('/posts', config)

//   return response.data
// }


const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + taskId, config)

  return response.data
}

const taskService = {
  createTask,
  getTasks,
  deleteTask,
}

export default taskService
