import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData } = props;
    return (
        <div className="project-card">
        <Link className="nav-link" to={`/project/${projectData.id}`}>
        <img 
        alt="projectData"
        src={projectData.image}
        />
        <h3>{projectData.title}</h3>
        </Link>
        </div>
    );
}

export default ProjectCard;