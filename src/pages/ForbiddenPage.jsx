import React from "react";
import { Link } from "react-router-dom"


const Forbidden = () => {
    return (
        <div>
            <h2>Sorry</h2>
            <p>Only the owner has permission to edit this project.</p>
            <Link to="/">Return to Homepage </Link>
        </div>
    )
}

export default Forbidden;