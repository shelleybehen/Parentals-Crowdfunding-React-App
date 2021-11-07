import React, { useState } from 'react';
import './CreateProjectForm.css'

const CreateProjectForm = () => {
    const startingValues = {
        title: '',
        description: '',
        categories: '',
        goal: '',
        image: '',
        is_open: true,
        date_created: new Date()
    }
    const [projectInfo, setProjectInfo] = useState(startingValues)
    

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectInfo((prevProject) => {
        return {
            ...prevProject,
            [id]: value,
            };
        });
    };
  
    const postData = async () => {
    console.log('Im posting a project to your API');
    const token = window.localStorage.getItem('token');
    console.log('What is token: ', token)
    
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}projects/`,
        {
        method: 'post',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectInfo),
        }
        );
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            postData().then((response) => {
            console.log('response from our API --------', response);
            setProjectInfo(startingValues)
        });
    };
    
    return (
        <div className='project-page'>
            <div className='proj-form'>
                <h3 className='sign2' align='center'>Create a new Campaign</h3>
        <form className='form2'>
        <div>
        <label className='label1' htmlFor='title'>Project Title: </label>
        <input
            value={projectInfo.title}
            className='field2'
            type='text'
            id='title'
            placeholder='Enter Project Title'
            onChange={handleChange}
        />
        </div>
        <div>
        <label className='label1' htmlFor='description'>Project Description: </label>
        <input
            value={projectInfo.description}
            className='field2'
            type='text'
            id='description'
            placeholder='Enter Project Description'
            onChange={handleChange}
        />
        </div>
        <div>
        <label className='label1' htmlFor='categories'>Project Category: </label>
        <input
            value={projectInfo.categories}
            className='field2'
            type='text'
            id='categories'
            placeholder='Enter Project Category'
            onChange={handleChange}
        />
        </div>
        <div>
        <label className='label1' htmlFor='goal'>Project Hours Goal: </label>
        <input
            value={projectInfo.goal}
            className='field2'
            type= 'text'
            id='goal'
            placeholder='Enter Project Hours Goal'
            onChange={handleChange}
        />
        </div>
        <div>
        <label className='label1' htmlFor='image'>Submit an Image: </label>
        <input
            value={projectInfo.image}
            className='field2'
            type='text'
            id='image'
            placeholder='Add Image URL'
            onChange={handleChange}
        />
        </div>
        <div>
        <button 
            className='submit2' 
            align='center'
            type='submit'
            onClick={handleSubmit}
        >
            Submit
        </button>
        </div>
        </form>
            </div>
        </div>
  );
};

export default CreateProjectForm;