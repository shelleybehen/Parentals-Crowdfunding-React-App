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
        if (err.message === "You do not have permission to perform this action.") {
          history.push("/forbidden")
        }
        setError(err.message)
      }
      // setIsEditing(false);
    };

  const ReadProject = () => {
    return (
      <div>
        <h1>{projectData.title}</h1>
        <img src={projectData.image} alt='project'/>
        <h2>{`Description: ${projectData.description}`}</h2>
        <h3>Created at: {formattedDate}</h3>
        <h3>{`Is Open to pledges: ${projectData.is_open}`}</h3>
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {pledgeData.amount} from {pledgeData.supporter}"
                {pledgeData.comment}"
              </li>
            );
        })}
        </ul>
      </div>
    )
  }
  console.log("project data is:", projectData);
  
    // This method sends a request to the API. In almost all cases, that is not an instantaneous action.
  // Therefore we declare this function as asynchronous, telling the function we will have to wait for something
  // to finish inside it.
  const deleteProject = async () => {
    // This is our API request, which we need to tell our function to wait for using the key word await
    await fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`, {
      method: "delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    })
    // Once we delete the project above, we then want to navigate back to the homepage
    // since the project we are looking at, doesn't exist anymore
    history.push('/')
  }


  return (
    <div>
      { localStorage.getItem('token') 
        && isEditing === false 
        && <button onClick={() => setIsEditing(true)}>Edit Project</button> 
      }
      <div>
      {
        isEditing
        ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                value={projectData.title}
                type="text"
                id="title"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                value={projectData.description}
                type="text"
                id="description"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="goal">Goal:</label>
              <input
                value={projectData.amount}
                type="text"
                id="amount"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                value={projectData.image}
                type="text"
                id="image"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="is_open">Open:</label>
              <input
                value={projectData.is_open}
                type="text"
                id="is_open"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update Project</button>
            <div>{error && <div>{error}</div>}</div>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={deleteProject}>Delete Project</button> 
          </form>
         ) : (
        <ReadProject />
    )}
      </div>
    </div>
  );
}


export default ProjectPage;
