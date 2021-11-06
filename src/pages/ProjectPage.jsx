import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { id: project_id } = useParams();
    const formattedDate = new Date(projectData.date_created).toLocaleDateString();

    useEffect(() => {
        //get project data - but this time it's the single project ID
        fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`)
          .then((results) => {
            console.log("results", results);
            return results.json();
          })
          .then((data) => {
            console.log("data", data);
            setProjectData(data);
          });
      }, [project_id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log("we are updating the project");
        setProjectData({
          ...projectData,
          [id]: value,
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}projects/${project_id}/`,
          {
            method: "put",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
          }
        );
        if (!response.ok) {
          const { detail } = await response.json()
          throw new Error(detail)
        }
      } catch(err) {
        alert('Only the owner can make changes or delete projects');
        if (err.message === "You do not have permission to perform this action.") {
          history.push('/')
        }
        setError(err.message)
      }
    };

  const ReadProject = () => {
    return (
      <div className='returnedproject'>
        <h1>{projectData.title}</h1>
        <img src={projectData.image} alt='project'/>
        <h2>{`Description: ${projectData.description}`}</h2>
        <h3>Created on: {formattedDate}</h3>
        <h3>{`Is Open to pledges: ${projectData.is_open}`}</h3>
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {pledgeData.amount} hours donated from user number {pledgeData.supporter}. Comment:  "
                {pledgeData.comment}"
              </li>
            );
        })}
        </ul>
      </div>
    )
  }
  console.log("project data is:", projectData);
  

  const deleteProject = async () => {
   
    await fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`, {
      method: "delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    })
   
    history.push('/')
  }


  return (
    <div className='updateproject'>
        <p className='sign4' align='center'>Update or Delete a Campaign</p>  
    <div className='form5'>
        <div className='editbox'>
      { localStorage.getItem('token') 
        && isEditing === false 
        && <button className='submit5' onClick={() => setIsEditing(true)}>Edit This Campaign</button> 
      }
      </div>
      {
        isEditing
        ? (
          <form className='form4' onSubmit={handleSubmit}>
            <div>
              <label className='label3' htmlFor="title">Title:</label>
              <input
                value={projectData.title}
                className='field4'
                type="text"
                id="title"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='label3' htmlFor="description">Description:</label>
              <input
                value={projectData.description}
                className='field4'
                type="text"
                id="description"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='label3' htmlFor="goal">Goal:</label>
              <input
                value={projectData.amount}
                className='field4'
                type="text"
                id="amount"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='label3' htmlFor="image">Image:</label>
              <input
                value={projectData.image}
                className='field4'
                type="text"
                id="image"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='label3' htmlFor="is_open">Open:</label>
              <input
                value={projectData.is_open}
                className='field4'
                type="text"
                id="is_open"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className='buttongroup'>
            <button className='submit4' type="submit">Update Campaign</button>
            <button className='submit4' onClick={() => setIsEditing(false)}>Cancel</button>
            <button className='submit4' onClick={deleteProject}>Delete Campaign</button> 
            <div>{error && <div>{error}</div>}</div>
            </div>
          </form>
         ) : (
        <ReadProject />
    )}
      </div>
    </div>
  );
}


export default ProjectPage;
