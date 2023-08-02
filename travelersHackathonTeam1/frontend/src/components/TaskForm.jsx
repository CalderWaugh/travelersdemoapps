import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'
const API_URL = '/api/tasks/'

function TaskForm() {
  const [formData, setFormData] = useState({description: '',teamSize: 0,budget:0,workLoad:'', completionTime:0,complete:0,personAssigned:'',dueDate:'',estimatedDuration:''})
  const { user } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    // console.log(formData);

    await fetch(`posts/?id=${formData.description}`)
    .then(res => res.json())
    .then(text => setPosts(text));


    const config = {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'accept' : 'application/json'
      },
    }
    await fetch('/posts',{
    method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
      description: formData.description,
      username: user?.email,
      teamSize: formData.teamSize,
      budget: formData.budget,
      workLoad: formData.workLoad,
      completionTime: formData.completionTime,
      complete: formData.complete,
      personAssigned: formData.personAssigned,
      dueDate: formData.dueDate,
      estimatedDuration: formData.estimatedDuration


      
      })
    
    }
    
    );
    
    setFormData({description: ''})
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>description</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

<label htmlFor='text'>Team Size</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.teamSize}
            onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
          />

<label htmlFor='text'>budget</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          />

          
<label htmlFor='text'>work load</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.workLoad}
            onChange={(e) => setFormData({...formData, workLoad: e.target.value})}
          />

        <label htmlFor='text'>completion time</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.completionTime}
            onChange={(e) => setFormData({...formData, workLoad: e.target.value})}
          />

          <label htmlFor='text'>complete</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.complete}
            onChange={(e) => setFormData({...formData, complete: e.target.value})}
          />
          <label htmlFor='text'>person Assigned</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.personAssigned}
            onChange={(e) => setFormData({...formData, personAssigned: e.target.value})}
          />
          <label htmlFor='text'>due Date</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
          />
          <label htmlFor='text'>estimated Duration</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.estimatedDuration}
            onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
          />


          <label htmlFor='text'>person Assigned</label>
            <input
            type='text'
            name='description'
            id='descriptiton'
            value={formData.workLoad}
            onChange={(e) => setFormData({...formData, workLoad: e.target.value})}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
